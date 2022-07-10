import express from "express";
import livroController from "../controllers/livro.controller.js";

const router = express.Router();

router.post("/", livroController.createLivro);
router.post("/info", livroController.createLivroInfo);
router.post("/avaliacao", livroController.createAvaliacao);
router.get("/", livroController.getLivros);
router.get("/info", livroController.findAllLivroInfo);
router.get("/:id", livroController.getLivro);
router.delete("/:id", livroController.deleteLivro);
router.delete("/info/:id", livroController.deleteLivroInfo);
router.delete("/:id/avaliacao/:index", livroController.deleteAvaliacao);
router.put("/", livroController.updateLivro);
router.put("/info", livroController.updateLivroInfo);

export default router;