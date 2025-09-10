import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	passwordHash: string;
	role: "admin" | "editor" | "user";
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, index: true },
		passwordHash: { type: String, required: true },
		role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
	},
	{ timestamps: true }
);

export const User: Model<IUser> =
	(mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
