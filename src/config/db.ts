import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.DBURL as string;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB() {
  if (!uri) {
    throw new Error("❌ DBURL is missing in environment variables");
  }
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("MongoDB connect failed", error);
    process.exit(1);
  }
}
