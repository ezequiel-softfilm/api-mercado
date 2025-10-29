import { Router } from "express"
import { EntradaEstoqueRepository } from "../models/EntradaEstoque/repositories/EntradaEstoqueRepository"
import { EntradaEstoqueController } from "../controllers/EntradaEstoqueController"
import { ProdutoRepository } from "../models/Produto/repositories/ProdutoRepository"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = Router()

router.use(authMiddleware)

const entradaEstoqueRepository = new EntradaEstoqueRepository()
const produtoRepository = new ProdutoRepository()
const entradaEstoqueController = new EntradaEstoqueController(
    entradaEstoqueRepository,
    produtoRepository
)

router.get("/historico", (req, res) => entradaEstoqueController.findAll(req, res))
router.post("/entrada", (req, res) => entradaEstoqueController.create(req, res))

export default router