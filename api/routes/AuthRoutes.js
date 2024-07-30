import express from "express";
import { RegisterController, UserLogin } from "../Controller/AuthController.js";
import {
  AuthLoginValidator,
  AuthRegisterValidator,
} from "../valiodators/AuthValidator.js";

const router = express.Router();

router.post("/register", AuthRegisterValidator, RegisterController);
router.post("/login", AuthLoginValidator, UserLogin);

export { router as AuthRoutes };
