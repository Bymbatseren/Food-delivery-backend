import mongoose, { model, models } from "mongoose";

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

const FOOD_SCHEMA = new mongoose.Schema(
  {
    foodName: String,
    price: Number,
    image: String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: "FoodCategory",
    },
    ingredients: String,
  },
  { timestamps: true }
);

const FOOD_ORDER_ITEM_SCHEMA = new mongoose.Schema({
  food: String,
  quantity: Number,
});
const FOOD_ORDER_SCHEMA = new mongoose.Schema(
  {
    user: String,
    totalPrice: Number,
    foodOrderItems: [FOOD_ORDER_ITEM_SCHEMA],
    status: {
      type: String,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
    },
  },
  { timestamps: true }
);

const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);
const FoodModel = mongoose.model("Food", FOOD_SCHEMA, "food");
const FoodOrderModel =
  models["FoodOrder"] || model("FoodOrder", FOOD_ORDER_SCHEMA);

export { FoodCategoryModel, FoodModel, FoodOrderModel };
