import mongoose from "mongoose";
import { Schema } from "mongoose";

const mealInfoSchema: Schema = new mongoose.Schema({
    usedMeals: [String],
}, { _id: false });

export default mealInfoSchema;
