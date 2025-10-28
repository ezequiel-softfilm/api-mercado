import { Request, Response } from "express";
import { IProdutoRepository } from "../models/Produto/repositories/IProdutoRepository";
import { FindAllProdutosUseCase } from "../models/Produto/use-cases/FindAllProduto.use-case";
import { FindOneProdutoUseCase } from "../models/Produto/use-cases/FindOneProduto.use-case";
import { CreateProdutoDto } from "../models/Produto/dto/create-produto.dto";
import { CreateProdutoUseCase } from "../models/Produto/use-cases/CreateProduto.use-case";
import { UpdateProdutoUseCase } from "../models/Produto/use-cases/UpdateProduto.use-case";
import { ExcluirProdutoUseCase } from "../models/Produto/use-cases/ExcluirProduto.use-case";

export class ProdutoController
{
    constructor(private produtoRepository: IProdutoRepository){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllProdutosUseCase(this.produtoRepository)
            const produtos = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de todos os produtos",
                data: produtos
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async findOne(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)

            const useCase = new FindOneProdutoUseCase(this.produtoRepository)
            const produto = await useCase.execute(id)

            if(!produto) return res.status(404).json({ message: "Produto não encontrado."})

            return res.status(200).json(
            {
                message: "Detalhes do produto",
                data: produto
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async create(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const dto = new CreateProdutoDto(req.body)

            if(dto.qtde_estoque < 0) return res.status(400).json({ message: "Quantidade de estoque não pode ser negativo"})
            if(dto.preco_unitario < 0) return res.status(400).json({ message: "Preço unitário não pode ser negativo"})

            const useCase = new CreateProdutoUseCase(this.produtoRepository)

            const produto = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Produto criado com sucesso.",
                data: produto
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async update(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)
            const data = req.body

            const useCase = new UpdateProdutoUseCase(this.produtoRepository)
            const updateProduto = await useCase.execute(id, data)

            if(!updateProduto) return res.status(404).json({ message: "Produto não encontrado"})

            return res.status(200).json(
            { 
                message: "Produto alterado com sucesso."
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async excluir(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const id = Number(req.params.id)

            const useCase = new ExcluirProdutoUseCase(this.produtoRepository)
            const excluirProduto = await useCase.execute(id)

            if(!excluirProduto) return res.status(404).json({ message: "Produto não encontrado."})

            return res.status(204).send()
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}