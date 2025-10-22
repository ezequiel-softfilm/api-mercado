import { Router } from "express";
import { create, findAll } from "../controllers/VendaController";

const router = Router()

router.get("/historico", findAll)
router.post("", create)

export default router