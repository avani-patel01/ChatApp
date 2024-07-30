import express from "express";
import { getMessages, deleteMessage } from "../Controller/MessageController.js";

const router = express.Router();

router.get("/:id", getMessages);
router.delete("/:id", deleteMessage);

export { router as MessageRoutes };
