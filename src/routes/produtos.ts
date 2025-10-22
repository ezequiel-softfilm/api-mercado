import { Router } from "express";
import { create, excluir, findAll, findOne, update } from "../controllers/ProdutoController";

const router = Router()

router.get("/", findAll)
router.get("/:id", findOne)
router.post("/", create)
router.put("/:id", update)
router.delete("/:id", excluir)

export default router