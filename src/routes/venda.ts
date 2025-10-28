import { Router } from "express"
import { VendaRepository } from "../models/Venda/repositories/VendaRepository"
import { VendaController } from "../controllers/VendaController"
import { ProdutoRepository } from "../models/Produto/repositories/ProdutoRepository"

const router = Router()

const vendaRepository = new VendaRepository()
const produtoRepository = new ProdutoRepository()
const vendaController = new VendaController(
    vendaRepository,
    produtoRepository
)

router.get("/", (req, res) => vendaController.findAll(req, res))
router.get("/:id", (req, res) => vendaController.findOne(req, res))
router.post("/", (req, res) => vendaController.create(req, res))

export default router