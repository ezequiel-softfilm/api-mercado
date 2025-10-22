import { Request, Response } from "express"
import { EntradaEstoque } from "../models/EntradaEstoque"
import { Produto } from "../models/Produto"

export const findAll = async (req: Request, res: Response) =>
{
    try
    {
        const entradas = await EntradaEstoque.findAll()

        res.status(200).json({
            message: "Listagem das entradas no estoque",
            data: entradas
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: "Erro ao listar as entradas de estoque",
            error: error
        })
    }
}

export const create = async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { id_produto: number; qtde: number }

        if(body.qtde <= 0)
        {
            return res.status(400).json({ message: "A quantidade não pode ser menor ou igual a 0"})
        }

        const produto = await Produto.findByPk(body.id_produto)
        if (!produto) return res.status(404).json({ message: "Produto não encontrado" })

        const entrada = await EntradaEstoque.create(body)

        await produto.update({ qtde_estoque: produto.qtde_estoque + body.qtde })

        res.status(201).json(
        {
            message: "Entrada de estoque realizada com sucesso",
            data: entrada
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: "Erro ao criar entradas de estoque",
            error: error
        })
    }
}