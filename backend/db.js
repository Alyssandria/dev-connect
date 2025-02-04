// INITIALIZE DATABASE
import { MongoClient } from "mongodb";

async function initDB() {
  const URI = "mongodb://localhost:27017";
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Connected to mongoDB");

    // CREATE A NEW DATABASE
    const database = client.db("dev-con");
    console.log(`Database successfully created: ${database.databaseName}`);

    // CREATE USER COLLECTION
    const users = database.collection("users");
    console.log(`Collection successfully created: ${users.collectionName}`);

    // CREATE DUMMY DATA
    await users.insertOne({ title: "test" });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

initDB().catch(console.error);
