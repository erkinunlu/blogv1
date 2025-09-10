import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI environment variable is not set");
}

let cached = (global as any).mongoose as
	| { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
	| undefined;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
	if (cached!.conn) return cached!.conn;

	if (!cached!.promise) {
		cached!.promise = mongoose
			.connect(MONGODB_URI, {
				bufferCommands: false,
			})
			.then((mongooseInstance) => mongooseInstance);
	}

	cached!.conn = await cached!.promise;
	return cached!.conn!;
}
