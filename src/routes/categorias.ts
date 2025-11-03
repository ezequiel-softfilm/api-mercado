import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CategoriaRepository } from "../models/Categoria/repositories/CategoriaRepository";
import { CategoriaController } from "../controllers/CategoriaController";

const router = Router()

const categoriaRepository = new CategoriaRepository()
const categoriaController = new CategoriaController(categoriaRepository)

router.use(authMiddleware)

router.get("/", (req, res) => categoriaController.findAll(req, res))
router.get("/:id", (req, res) => categoriaController.findOne(req, res))
router.post("/", (req, res) => categoriaController.create(req, res))
router.get("/:id", (req, res) => categoriaController.update(req, res))
router.get("/:id", (req, res) => categoriaController.excluir(req, res))

export default router