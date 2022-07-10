import express from "express";
import { authorize } from "../controllers/auth.controller.js";
import clienteController from "../controllers/cliente.controller.js";

const router = express.Router();

router.post("/", authorize("admin"), clienteController.createCliente);
router.get("/", authorize("admin"), clienteController.getClientes);
router.get("/:id", authorize("admin"), clienteController.getCliente);
router.delete("/:id", authorize("admin"), clienteController.deleteCliente);
router.put("/", authorize("admin", "cliente"), clienteController.updateCliente);

export default router;