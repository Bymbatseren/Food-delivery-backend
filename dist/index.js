"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { verifyToken } = require("@clerk/backend");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const Schames_1 = require("./Schames");
const cors = require("cors");
const app = (0, express_1.default)();
const port = 4000;
app.use(cors());
(0, dotenv_1.config)();
const URI = process.env.MONGODB_URI;
app.use(express_1.default.json());
const connectMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect(URI);
});
app.get("/food-category/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get("authentication");
        console.log(token);
        const verified = yield verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        console.log({ verified });
        const foodCategories = yield Schames_1.FoodCategoryModel.find();
        res.json(foodCategories);
    }
    catch (_a) {
        res.send("error");
    }
}));
app.post("/food-category/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const newItem = yield Schames_1.FoodCategoryModel.create({
        categoryName: name,
    });
    const foodCategories = yield Schames_1.FoodCategoryModel.find();
    res.json(foodCategories);
}));
app.delete("/food-category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const deletedItem = yield Schames_1.FoodCategoryModel.deleteOne({
        _id: categoryId,
    });
    const foodCategories = yield Schames_1.FoodCategoryModel.find();
    res.json(foodCategories);
}));
app.put("/food-category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const oneCategory = Schames_1.FoodCategoryModel.findOne({ _id: categoryId });
    const replacedItem = yield oneCategory.updateOne({
        categoryName: "Gunje",
    });
    const foodCategories = yield Schames_1.FoodCategoryModel.find();
    res.json(foodCategories);
}));
app.get("/food/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const food = yield Schames_1.FoodModel.find(filter).populate("category");
        res.json(food);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch foods", error });
    }
}));
app.post("/food/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodName = req.body.foodName;
    const price = req.body.price;
    const ingredients = req.body.ingredients;
    const image = req.body.image;
    const newItem = yield Schames_1.FoodModel.create({
        foodName: foodName,
        price: price,
        category: req.body.category,
        image: image,
        ingredients: ingredients,
    });
    const food = yield Schames_1.FoodModel.find();
    res.json(food);
}));
app.put("/food/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodId = req.params.id;
    const oneFood = Schames_1.FoodModel.findOne({ _id: foodId });
    const replacedFood = yield oneFood.updateOne({
        foodName: req.body.foodName,
        price: req.body.price,
        image: req.body.image,
        ingredients: req.body.ingredients,
        category: req.body.category,
    });
    const food = yield Schames_1.FoodModel.find();
    res.json("success");
}));
app.delete("/food/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodId = req.params.id;
    const deletedItem = yield Schames_1.FoodModel.deleteOne({
        _id: foodId,
    });
    const food = yield Schames_1.FoodModel.find();
    res.json(food);
}));
app.post("/food-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.userId;
    const { foodOrderItems, totalPrice } = req.body;
    const order = { user, foodOrderItems, totalPrice };
    const newOrder = yield Schames_1.FoodOrderModel.create(order);
    res.json(newOrder);
}));
connectMongoDb().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
