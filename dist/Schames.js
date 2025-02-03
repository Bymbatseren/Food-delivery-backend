"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodOrderModel = exports.FoodModel = exports.FoodCategoryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FOOD_CATEGORY_SCHEMA = new mongoose_1.default.Schema({
    categoryName: String,
}, { timestamps: true });
const FOOD_SCHEMA = new mongoose_1.default.Schema({
    foodName: String,
    price: Number,
    image: String,
    category: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "FoodCategory",
    },
    ingredients: String,
}, { timestamps: true });
const FOOD_ORDER_ITEM_SCHEMA = new mongoose_1.default.Schema({
    food: String,
    quantity: Number,
});
const FOOD_ORDER_SCHEMA = new mongoose_1.default.Schema({
    user: String,
    totalPrice: Number,
    foodOrderItems: [FOOD_ORDER_ITEM_SCHEMA],
    status: {
        type: String,
        enum: ["PENDING", "CANCELED", "DELIVERED"],
    },
}, { timestamps: true });
const FoodCategoryModel = mongoose_1.default.model("FoodCategory", FOOD_CATEGORY_SCHEMA, "food-category");
exports.FoodCategoryModel = FoodCategoryModel;
const FoodModel = mongoose_1.default.model("Food", FOOD_SCHEMA, "food");
exports.FoodModel = FoodModel;
const FoodOrderModel = mongoose_1.models["FoodOrder"] || (0, mongoose_1.model)("FoodOrder", FOOD_ORDER_SCHEMA);
exports.FoodOrderModel = FoodOrderModel;
