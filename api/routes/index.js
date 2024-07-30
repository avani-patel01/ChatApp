import express from "express";
import { AuthRoutes } from "./AuthRoutes.js";
import { MessageRoutes } from "./MessageRoutes.js";

export const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/message", MessageRoutes);