import React from 'react';
import { ILiveNotificationsProps } from './types';
import { IAdminState } from '../store/admin/types';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import {
  getLiveStats,
  sendLiveNotification,
  setLiveNotificationData,
} from '../store/admin/actions';
import ReactTable from 'react-table';

const columns = [
  {
    Header: 'Event Id',
    accessor: 'id',
  },
  {
    Header: 'Event Name',
    accessor: 'name',
  },
  {
    Header: 'Subscriptions',
    accessor: 'numSubscriptions',
  },
];

const LiveNotifications = (props: ILiveNotificationsProps) => {
  return (
    <div>
      <div className="row">
        <div className="form-group col-12 col-sm-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.sendNotification();
            }}
          >
            <textarea
              required
              className="form-control"
              placeholder="Notification Title"
              value={props.liveNotification.title}
              onChange={(e) =>
                props.setNotificationData({
                  title: e.target.value,
                  body: props.liveNotification.body,
                })
              }
            ></textarea>
            <textarea
              required
              className="form-control"
              placeholder="Notification Body"
              value={props.liveNotification.body}
              onChange={(e) =>
                props.setNotificationData({
                  title: props.liveNotification.title,
                  body: e.target.value,
                })
              }
            ></textarea>
            <input className="form-control" type="submit" />
          </form>
        </div>
        <div className="col-12 col-sm-6">
          <small>
            <div>
              The input on the left will send a mass notification to all devices
              subscribed to any event notification via TreeHacks Live, the event
              schedule app. This is a good way to notify all attendees of a
              last-minute change or important information.
            </div>
            <hr />
            <div>
              <b>Total Devices:</b> {props.liveStats.numDevices}
              <br />
              <b>Total Subscriptions:</b> {props.liveStats.numSubscriptions}
            </div>
          </small>
        </div>
      </div>
      <div className="col-12">
        <ReactTable
          filterable
          columns={columns}
          data={props.liveStats.events}
          minRows={0}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...(state.admin as IAdminState),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getLiveStats: () => dispatch(getLiveStats()),
  setNotificationData: (data: { title: string; body: string }) =>
    dispatch(setLiveNotificationData(data)),
  sendNotification: () => dispatch(sendLiveNotification()),
});

class LiveNotificationsWrapper extends React.Component<
  ILiveNotificationsProps,
  {}
> {
  componentDidMount() {
    this.props.getLiveStats();
  }
  render() {
    if (!this.props.liveStats) {
      return <Loading />;
    }
    return <LiveNotifications {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveNotificationsWrapper);
