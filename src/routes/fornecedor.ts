import { Router } from "express";
import { FornecedorRepository } from "../models/Fornecedor/repositories/FornecedorRepository";
import { FornecedorController } from "../controllers/FornecedorController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()

const fornecedorRepository = new FornecedorRepository()
const fornecedorController = new FornecedorController(fornecedorRepository)

router.use(authMiddleware)

router.get("/", (req, res) => fornecedorController.findAll(req, res));
router.get("/:id", (req, res) => fornecedorController.findOne(req, res));
router.post("/", (req, res) => fornecedorController.create(req, res));
router.put("/:id", (req, res) => fornecedorController.update(req, res));
router.delete("/:id", (req, res) => fornecedorController.excluir(req, res));

export default router