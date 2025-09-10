import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
	name: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
	{
		name: { type: String, required: true, trim: true, unique: true },
		slug: { type: String, required: true, unique: true, index: true },
	},
	{ timestamps: true }
);

export const Category: Model<ICategory> =
	(mongoose.models.Category as Model<ICategory>) ||
	mongoose.model<ICategory>("Category", CategorySchema);
