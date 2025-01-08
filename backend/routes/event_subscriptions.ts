// Push notifications for TreeHacks Live

import { Request, Response } from 'express';
import webpush, { PushSubscription } from 'web-push';
import axios from 'axios';
import { EventiveResponse } from '../services/live_notifications';
import LiveNotificationSubscription from '../models/LiveNotificationSubscription';

webpush.setVapidDetails(
  'mailto:hello@treehacks.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const EVENTS_API_URL = `https://api.eventive.org/event_buckets/${process.env.EVENTIVE_EVENT_BUCKET}/events?api_key=${process.env.EVENTIVE_API_KEY}`;

async function getEvents() {
  const req = await axios.get<EventiveResponse>(EVENTS_API_URL);
  return req.data.events;
}

async function getEvent(eventId: string) {
  const events = await getEvents();
  return events.find((evt) => evt.id === eventId);
}

async function getSubscriptions(endpoint: string) {
  const subscriptions = await LiveNotificationSubscription.find({
    'subscription.endpoint': endpoint,
  });
  return subscriptions.map((sub) => sub.eventId);
}

export async function getEventSubscriptions(req: Request, res: Response) {
  const endpoint = req.query.endpoint;

  if (endpoint == null) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }

  const events = await getSubscriptions(endpoint);
  return res.json(events);
}

export async function createEventPushSubscription(req: Request, res: Response) {
  const sub: PushSubscription | null = req.body.subscription;
  const eventId = req.body.eventId;

  if (
    sub == null ||
    sub.endpoint == null ||
    sub.keys == null ||
    sub.keys.auth == null ||
    sub.keys.p256dh == null ||
    eventId == null
  ) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }

  const event = await getEvent(eventId);
  if (!event) {
    return res.status(400).json({ error: 'Event not found' });
  }

  const existingSub = await LiveNotificationSubscription.findOne({
    'subscription.endpoint': sub.endpoint,
    eventId,
  });

  if (existingSub != null) {
    return res.status(400).json({ error: 'Subscription already exists' });
  }

  await new LiveNotificationSubscription({ subscription: sub, eventId }).save();

  // Return the user's updated list of subscribed events
  const events = await getSubscriptions(sub.endpoint);
  return res.json({ subscriptions: events });
}

export async function deleteEventPushSubscription(req: Request, res: Response) {
  const sub = req.body.subscription;
  const eventId = req.body.eventId;

  if (sub == null || sub.endpoint == null || eventId == null) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }

  await LiveNotificationSubscription.findOneAndDelete({
    'subscription.endpoint': sub.endpoint,
    eventId,
  });

  const events = await getSubscriptions(sub.endpoint);
  return res.json({ subscriptions: events });
}

// Admin endpoints

export interface LiveStats {
  numDevices: number;
  numSubscriptions: number;
  events: Array<{ id: string; name: string; numSubscriptions: number }>;
}

export async function getLiveStats(req: Request, res: Response) {
  const subscriptions = await LiveNotificationSubscription.find();
  const numDevices = new Set(
    subscriptions.map((sub) => sub.subscription.endpoint)
  ).size;
  const numSubscriptions = subscriptions.length;

  const eventData = await getEvents();
  const groupedSubscriptions = await LiveNotificationSubscription.aggregate([
    { $group: { _id: '$eventId', count: { $sum: 1 } } },
  ]);

  const eventStats = await Promise.all(
    groupedSubscriptions.map(async (event) => {
      const evt = eventData.find((e) => e.id === event._id);
      return evt != null
        ? { id: evt.id, name: evt.name, numSubscriptions: event.count }
        : null;
    })
  ).then((events) => events.filter((e) => e != null));

  return res.json({ numDevices, numSubscriptions, events: eventStats });
}

export async function sendLiveNotification(req: Request, res: Response) {
  const title = req.body.title;
  const body = req.body.body;

  if (title == null || body == null) {
    return res.status(400).json({ error: 'Invalid notification' });
  }

  const uniqueSubscriptions = await LiveNotificationSubscription.aggregate([
    {
      $group: {
        _id: '$subscription.endpoint',
        subscription: { $first: '$subscription' },
      },
    },
  ]);

  const payload = JSON.stringify({ title, body });

  await Promise.all(
    uniqueSubscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(sub.subscription, payload);
      } catch (err) {
        console.error('Error sending notification', err);
      }
    })
  );

  return res.json({ success: true });
}
