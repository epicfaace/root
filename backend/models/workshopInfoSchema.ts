import mongoose from "mongoose";
import { Schema } from "mongoose";

const workshopInfoSchema: Schema = new mongoose.Schema({
    attendedWorkshops: [String],
}, { _id: false });

export default workshopInfoSchema;