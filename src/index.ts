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

// GET All Houses (Search + Filter + Sort + Pagination)
app.get("/houses", async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      category = "",
      division = "",
      sort = "",
      page = "1",
      limit = "8",
    } = req.query;

    const query: any = {};

    // Search by title
    if (search) {
      query.title = {
        $regex: String(search),
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = String(category);
    }

    // Filter by division
    if (division && division !== "All") {
      query.division = String(division);
    }

    // Sorting
    let sortOption: any = {};

    switch (sort) {
      case "low":
        sortOption = { rent: 1 };
        break;

      case "high":
        sortOption = { rent: -1 };
        break;

      case "new":
        sortOption = { _id: -1 };
        break;

      case "old":
        sortOption = { _id: 1 };
        break;

      default:
        sortOption = {};
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const skip = (currentPage - 1) * perPage;

    const total = await housesCollection.countDocuments(query);

    const houses = await housesCollection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage)
      .toArray();

    res.status(200).json({
      success: true,
      houses,
      total,
      currentPage,
      totalPages: Math.ceil(total / perPage),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch houses",
    });

  }
});

// GET My Houses
app.get("/my-houses/:ownerId", async (req: Request, res: Response) => {
  try {
    const ownerId = req.params.ownerId;

    const houses = await housesCollection
      .find({
        ownerId: ownerId,
      })
      .sort({
        _id: -1,
      })
      .toArray();

    res.status(200).json({
      success: true,
      houses,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to get my houses",
    });

  }
});

// GET Related Houses
app.get("/houses/:id/related", async (req: Request, res: Response) => {
  try {

    const id = String(req.params.id);


    const currentHouse = await housesCollection.findOne({
      _id: new ObjectId(id)
    });


    if (!currentHouse) {
      return res.status(404).json({
        success:false,
        message:"House not found"
      });
    }


    const relatedHouses = await housesCollection
      .find({
        _id:{
          $ne:new ObjectId(id)
        },

        category: currentHouse.category,

        division: currentHouse.division,

        propertyType: currentHouse.propertyType
      })
      .limit(4)
      .toArray();



    res.status(200).json({
      success:true,
      houses:relatedHouses
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Failed to get related houses"
    });

  }
});

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

// DELETE House
app.delete("/houses/:id", async (req: Request, res: Response) => {
  try {

    const id = String(req.params.id);

    const result = await housesCollection.deleteOne({
      _id: new ObjectId(id),
    });


    if(result.deletedCount === 0){

      return res.status(404).json({
        success:false,
        message:"House not found"
      });

    }


    res.status(200).json({
      success:true,
      message:"House deleted successfully"
    });


  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Failed to delete house"
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