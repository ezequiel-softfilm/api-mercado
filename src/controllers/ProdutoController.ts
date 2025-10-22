import { Request, Response } from 'express'
import { Produto, ProdutoEnumAtivo } from '../models/Produto'

export const findAll = async (req: Request, res: Response) =>
{
    try
    {
        const produtos = await Produto.findAll({ where: { ativo: ProdutoEnumAtivo.Ativo} })

        res.json(
        {
            message: "Listagem de todos os produtos",
            data: produtos
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: `Erro ao listar os produtos`,
            error: error
        })
    }
}

export const findOne = async (req: Request, res: Response) =>
{
    try
    {
        const produto = await Produto.findByPk(req.params.id)
        if(!produto) return res.status(404).json({ error: "Produto não encontrado"})
        
        res.status(200).json(
        {
            message: "Informações de produto",
            data: produto
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: `Erro ao listar o produto`,
            error: error
        })
    }
}

export const create = async (req: Request, res: Response) =>
{
    try
    {
        if(req.body.qtde_estoque < 0) throw new Error("Não é possível criar produto com estoque negativo")

        const produto = await Produto.create(req.body)

        res.status(201).json(
        {
            message: "Produto criado com sucesso",
            data: produto
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: "Erro ao criar produto",
            error: error
        })
    }
}

export const update = async (req: Request, res: Response) =>
{
    try
    {
        const produto = await Produto.findByPk(req.params.id)
        if(!produto) return res.status(404).json({ error: "Produto não encontrado"})

        await produto?.update(req.body)

        res.status(200).json(
        {
            message: "Produto alterado com sucesso",
            data: produto
        })
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: "Erro ao atualizar produto",
            error: error
        })
    }
}

export const excluir = async (req: Request, res: Response) =>
{
    try
    {
        const produto = await Produto.findByPk(req.params.id)
        if(!produto) return res.status(404).json({ error: "Produto não encontrado"})

        await produto?.destroy()

        res.sendStatus(204)
    }
    catch(error)
    {
        res.status(500).json(
        {
            message: "Erro ao deletar produto",
            error: error
        })
    }
}