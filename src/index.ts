import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);

// Database & Collection
const database = client.db(process.env.AUTH_DB_NAME as string);
const housesCollection = database.collection("houses");

// Connect MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
}

connectDB();

// POST House
app.post("/houses", async (req: Request, res: Response) => {
  try {
    const house = req.body;

    const result = await housesCollection.insertOne(house);

    res.status(201).json({
      success: true,
      message: "House added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add house",
      error,
    });
  }
});

// GET All Houses
app.get("/houses", async (req: Request, res: Response) => {
  const houses = await housesCollection.find().toArray();
  res.send(houses);
});

// GET Single House
// GET Single House
app.get("/houses/:id", async (req: Request, res: Response) => {
  try {

    const id = String(req.params.id);


    const house = await housesCollection.findOne({
      _id: new ObjectId(id),
    });


    if (!house) {
      return res.status(404).json({
        success: false,
        message: "House not found",
      });
    }


    res.status(200).json(house);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to get house",
    });

  }
});
// Home Route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});