import { Router, Request, Response} from "express"
import produtosRouter from './produtos'
import entradaEstoqueRouter from './entradaEstoque'
import vendaRouter from './venda'
const router = Router()

router.use("/produtos", produtosRouter)
router.use("/estoque", entradaEstoqueRouter)
router.use("/vendas", vendaRouter)

export default router
