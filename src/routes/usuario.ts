import { Router } from "express";
import { UsuarioRepository } from "../models/Usuario/repositories/UsuarioRepository";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router()

const usuarioRepository = new UsuarioRepository()
const usuarioController = new UsuarioController(usuarioRepository)

router.get("/", (req, res) => usuarioController.findAll(req, res))
router.get("/:id", (req, res) => usuarioController.findById(req, res))
router.get("/email/:email", (req, res) => usuarioController.findByEmail(req, res))
router.post("/", (req, res) => usuarioController.create(req, res))

export default router