import { Request, Response } from "express";
import { Venda } from "../models/Venda";
import { Produto } from "../models/Produto";

export const findAll = async (req: Request, res: Response) =>
{
    try
    {
        const vendas = await Venda.findAll()

        res.status(200).json(
        {
            message: "Histórico de venda",
            data: vendas
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: `Erro ao listar as vendas`,
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

        if(body.qtde > produto.qtde_estoque) 
        {
            return res.status(400).json({ message: "Saldo insuficiente"})
        }

        const preco_unitario = produto.preco_unitario
        const total = preco_unitario * body.qtde

        const venda = await Venda.create({
            id_produto: body.id_produto,
            qtde: body.qtde,
            preco_unitario,
            total,
        })

        await produto.update({ qtde_estoque: produto.qtde_estoque - body.qtde })

        res.status(201).json(
        {
            message: "Venda realizada com sucesso",
            data: venda
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: `Erro ao registrar uma venda`,
            error: error
        })
    }
}