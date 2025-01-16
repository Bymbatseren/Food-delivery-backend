import mongoose from "mongoose";

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
    category: mongoose.Types.ObjectId,
    ingredients: String,
  },
  { timestamps: true }
);

const FOOD_ORDER_ITEM_SCHEMA = new mongoose.Schema({
  food: mongoose.Types.ObjectId,
  quantity: Number,
});

const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-category"
);
const FoodModel = mongoose.model("Food", FOOD_SCHEMA, "food");
const FoodOrderItemModel = mongoose.model(
  "FoodOrderItem",
  FOOD_ORDER_ITEM_SCHEMA,
  "food-order-item"
);

export { FoodCategoryModel, FoodModel, FoodOrderItemModel };
