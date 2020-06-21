"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const userController_1 = require("../controllers/userController");
router.post('/signup', userController_1.signUp);
router.post('/signin', userController_1.signIn);
exports.default = router;
