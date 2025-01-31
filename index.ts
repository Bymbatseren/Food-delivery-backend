import express, { Request, Response } from "express";
const { verifyToken } = require("@clerk/backend");
import mongoose from "mongoose";
import { config } from "dotenv";
import { REPLCommand } from "repl";
import { FoodCategoryModel, FoodModel, FoodOrderModel } from "./Schames";
const cors = require("cors");
type CustomRequest =
  | Request & {
      userId?: String;
    };

const app = express();
const port = 4000;
app.use(cors());

config();

const URI = process.env.MONGODB_URI;

app.use(express.json());

const connectMongoDb = async () => {
  mongoose.connect(URI!);
};

app.get("/food-category/", async (req: Request, res: Response) => {
  try {
    const token = req.get("authentication");
    console.log(token);

    const verified = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    console.log({ verified });
    const foodCategories = await FoodCategoryModel.find();
    res.json(foodCategories);
  } catch {
    res.send("error");
  }
});
app.post("/food-category/", async (req: Request, res: Response) => {
  const name = req.body.name;
  const newItem = await FoodCategoryModel.create({
    categoryName: name,
  });
  const foodCategories = await FoodCategoryModel.find();

  res.json(foodCategories);
});
app.delete("/food-category/:id", async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  const deletedItem = await FoodCategoryModel.deleteOne({
    _id: categoryId,
  });

  const foodCategories = await FoodCategoryModel.find();
  res.json(foodCategories);
});

app.put("/food-category/:id", async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const oneCategory = FoodCategoryModel.findOne({ _id: categoryId });
  const replacedItem = await oneCategory.updateOne({
    categoryName: "Gunje",
  });
  const foodCategories = await FoodCategoryModel.find();

  res.json(foodCategories);
});

app.get("/food/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const food = await FoodModel.find(filter).populate("category");
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods", error });
  }
});
app.post("/food/", async (req: Request, res: Response) => {
  const foodName = req.body.foodName;
  const price = req.body.price;
  const ingredients = req.body.ingredients;
  const image = req.body.image;
  const newItem = await FoodModel.create({
    foodName: foodName,
    price: price,
    category: req.body.category,
    image: image,
    ingredients: ingredients,
  });
  const food = await FoodModel.find();
  res.json(food);
});
app.put("/food/:id", async (req: Request, res: Response) => {
  const foodId = req.params.id;
  const oneFood = FoodModel.findOne({ _id: foodId });
  const replacedFood = await oneFood.updateOne({
    foodName: req.body.foodName,
    price: req.body.price,
    image: req.body.image,
    ingredients: req.body.ingredients,
    category: req.body.category,
  });
  const food = await FoodModel.find();

  res.json("success");
});
app.delete("/food/:id", async (req: Request, res: Response) => {
  const foodId = req.params.id;

  const deletedItem = await FoodModel.deleteOne({
    _id: foodId,
  });

  const food = await FoodModel.find();
  res.json(food);
});
app.post("/food-order", async (req: CustomRequest, res: Response) => {
  const user = req?.userId;
  const { foodOrderItems, totalPrice } = req.body;
  const order = { user, foodOrderItems, totalPrice };
  const newOrder = await FoodOrderModel.create(order);
  res.json(newOrder);
});

connectMongoDb().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
