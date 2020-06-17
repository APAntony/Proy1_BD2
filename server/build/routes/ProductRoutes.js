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
const express_1 = require("express");
const products_1 = __importDefault(require("../models/products"));
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.hasOwnProperty("lat") &&
                req.query.hasOwnProperty("long")) {
                const lat = Number(req.query.lat);
                const long = Number(req.query.long);
                if (!isNaN(lat) && !isNaN(long)) {
                    const productos = yield products_1.default.find({
                        location: {
                            $near: {
                                $maxDistance: 50000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: [lat, long],
                                },
                            },
                        },
                    });
                    res.json({ data: productos });
                }
                else {
                    res.json("not a number");
                }
            }
            else {
                const productos = yield products_1.default.find();
                res.json(productos);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { name, description, price, place, location } = req.body;
            const newProduct = new products_1.default({
                name,
                description,
                price,
                place,
                location,
            });
            yield newProduct.save();
            res.json({ data: newProduct });
        });
    }
    routes() {
        this.router.get("/", this.getProducts);
        this.router.post("/", this.createProduct);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
