import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { ProdutoRepository } from "../models/Produto/repositories/ProdutoRepository";

const router = Router();

const produtoRepository = new ProdutoRepository();
const produtoController = new ProdutoController(produtoRepository);

router.get("/", (req, res) => produtoController.findAll(req, res));
router.get("/:id", (req, res) => produtoController.findOne(req, res));
router.post("/", (req, res) => produtoController.create(req, res));
router.put("/:id", (req, res) => produtoController.update(req, res));
router.delete("/:id", (req, res) => produtoController.excluir(req, res));

export default router;