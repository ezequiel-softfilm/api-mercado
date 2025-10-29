import { Router } from "express";
import { UsuarioRepository } from "../models/Usuario/repositories/UsuarioRepository";
import { AuthController } from "../controllers/AuthControllers";

const router = Router()

const usuarioRepository = new UsuarioRepository()
const usuarioController = new AuthController(usuarioRepository)

router.post("/login", (req, res) => usuarioController.login(req, res))

export default router