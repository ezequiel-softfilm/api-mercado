import { Request, Response } from "express";
import { ICompraRepository } from "../models/Compra/repositories/ICompraRepository";
import { ICompraItensRepository } from "../models/CompraItens/repositories/ICompraItensRepository";
import { FindAllCompraUseCase } from "../models/Compra/use-cases/FindAllCompra.use-case";
import { FindOneCompraUseCase } from "../models/Compra/use-cases/FindOneCompra.use-case";
import { FindItensCompraUseCase } from "../models/CompraItens/use-cases/FindItensCompraUseCase.use-case";
import { FindItemCompraUseCase } from "../models/CompraItens/use-cases/FindItemCompra.use-case";
import { CreateCompraDto } from "../models/Compra/dto/create-compra.dto";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CreateCompraItensUseCase } from "../models/CompraItens/use-cases/CreateCompraItens.use-case";
import { IProdutoRepository } from "../models/Produto/repositories/IProdutoRepository";
import { CreateCompraUseCase } from "../models/Compra/use-cases/CreateCompra.use-case";
import { IFornecedorRepository } from "../models/Fornecedor/repositories/IFornecedorRepository";

export class CompraController
{
    constructor(
        private compraRepository: ICompraRepository,
        private compraItensRepository: ICompraItensRepository,
        private produtoRepository: IProdutoRepository,
        private fornecedorRepository: IFornecedorRepository
    ){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllCompraUseCase(this.compraRepository)
            const compras = await useCase.execute()

            const comprasComItens = await Promise.all(
                compras.map(async (compra) =>
                {
                    const useCaseItens = new FindItensCompraUseCase(this.compraItensRepository)
                    const itens = await useCaseItens.execute(Number(compra.id))
                    return { ...compra, itens }
                })
            )

            return res.status(200).json(
            {
                message: "Lista de todas as compras",
                data: comprasComItens
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
            const id_compra = Number(req.params.id)

            const useCase = new FindOneCompraUseCase(this.compraRepository)
            const compra = await useCase.execute(id_compra)

            if(!compra) return res.status(404).json({ message: "Compra não encontrada."})

            const useCaseItem = new FindItemCompraUseCase(this.compraItensRepository)
            const itens = await useCaseItem.execute(id_compra)

            const compraComItem = { ...compra, itens }

            return res.status(200).json(
            {
                message: "Detalhes da compra",
                data: compraComItem
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }

    async create(req: AuthRequest, res: Response): Promise<Response>
    {
        try
        {
            const dto = new CreateCompraDto(req.body)
            dto.criado_por = Number(req.usuarioId)

            const useCase = new CreateCompraUseCase(
                this.compraRepository,
                this.fornecedorRepository,
                this.compraItensRepository,
                this.produtoRepository
            )
            
            const newCompra = await useCase.execute(dto)

            return res.status(201).json(
            {
                message: "Compra realizada com sucesso.",
                data: newCompra
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message })
        }
    }
}