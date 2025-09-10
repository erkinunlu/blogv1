import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComment extends Document {
	post: Types.ObjectId;
	name: string;
	email: string;
	content: string;
	approved: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
	{
		post: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		content: { type: String, required: true },
		approved: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Comment: Model<IComment> =
	(mongoose.models.Comment as Model<IComment>) ||
	mongoose.model<IComment>("Comment", CommentSchema);
