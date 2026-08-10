import express from "express";
import {
    sendMessage,
    getMessages,
    getMyChats,
    deleteChat
} from "../controllers/chatController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
    "/send",
    authMiddleware,
    sendMessage
);

router.get(
    "/my-chats",
    authMiddleware,
    getMyChats
);

router.delete(
    "/:productId",
    authMiddleware,
    deleteChat
);

router.get(
    "/:userId/:productId",
    authMiddleware,
    getMessages
);

export default router;