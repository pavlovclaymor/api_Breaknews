import express from "express";
import {
  findAll,
  create,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.midlewar.js";

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/top", topNews);
router.get("/", findAll);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update); 
router.delete("/:id", authMiddleware, erase)
router.patch("/like/:id", authMiddleware, likeNews);



export default router;
