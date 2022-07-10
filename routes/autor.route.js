import express from "express";
import autorController from "../controllers/autor.controller.js";

const router = express.Router();

router.post("/", autorController.createAutor);
router.get("/", autorController.getAutores);
router.get("/:id", autorController.getAutor);
router.delete("/:id", autorController.deleteAutor);
router.put("/", autorController.updateAutor);

export default router;