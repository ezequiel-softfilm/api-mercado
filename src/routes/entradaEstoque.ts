import { Router } from "express";
import { create, findAll } from "../controllers/EntradaEstoqueController";

const router = Router()

router.get("/historico", findAll)
router.post("/entrada", create)

export default router