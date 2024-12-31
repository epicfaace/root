import mongoose from "mongoose";
import { Schema } from "mongoose";

const checkInSchema: Schema = new mongoose.Schema({
    checkedIn: Boolean,
    checkedInBy: String,
    checkedInAt: Date
}, { _id: false });

export default checkInSchema;