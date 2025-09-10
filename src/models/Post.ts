import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPost extends Document {
	title: string;
	slug: string;
	excerpt?: string;
	content: string;
	coverImage?: string;
	published: boolean;
	categories: Types.ObjectId[];
	author: Types.ObjectId;
	publishedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
	{
		title: { type: String, required: true, trim: true },
		slug: { type: String, required: true, unique: true, index: true },
		excerpt: { type: String },
		content: { type: String, required: true },
		coverImage: { type: String },
		published: { type: Boolean, default: false },
		categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		publishedAt: { type: Date },
	},
	{ timestamps: true }
);

export const Post: Model<IPost> =
	(mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>("Post", PostSchema);
