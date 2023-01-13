import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { SponsorAdmin, ISponsorAdmin } from "../../models/SponsorAdmin";
import { Token } from "../../models/Token";
import { bulkAutoCreateUser } from "../../services/auth_actions";
import { sendSponsorAccountCreationEmail } from "../../services/send_email";

export async function createAdmin(req: Request, res: Response) {
  const { email, token } = req.body;

  const { company_id } = jwt.verify(token, process.env.JWT_SECRET);

  const tokenRecord = await Token.findOne({ company_id });
  if (!tokenRecord) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }

  try {
    const { password } = await bulkAutoCreateUser({ email, group: "sponsor" });
    await sendSponsorAccountCreationEmail(email, password);
  } catch (e) {
    res.status(400).json({ error: "Unable to create user" });
    return;
  }
  const sponsorAdmin: ISponsorAdmin = await SponsorAdmin.create({
    email,
    company_id,
  });

  res.status(200).json({ data: sponsorAdmin });
}
