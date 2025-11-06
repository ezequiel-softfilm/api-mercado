import { Request, Response } from "express";
import { IVendaRepository } from "../models/Venda/repositories/IVendaRepository";
import { FindAllVendasUseCase } from "../models/Venda/use-cases/FindAllVendas.use-case";
import { FindOneVendaUseCase } from "../models/Venda/use-cases/FindOneVenda.use-case";
import { CreateVendaDto } from "../models/Venda/dto/create-venda.dto";
import { CreateVendaUseCase } from "../models/Venda/use-cases/CreateVenda.use-case";
import { IProdutoRepository } from "../models/Produto/repositories/IProdutoRepository";
import { AuthRequest } from "../middlewares/authMiddleware";
import { MercadoPagoConfig, Preference } from 'mercadopago';

export class VendaController
{
    constructor(
        private vendaRepository: IVendaRepository,
        private produtoRepositoy: IProdutoRepository
    ){}

    async findAll(req: Request, res: Response): Promise<Response>
    {
        try
        {
            const useCase = new FindAllVendasUseCase(this.vendaRepository)
            const vendas = await useCase.execute()

            return res.status(200).json(
            {
                message: "Lista de vendas",
                data: vendas
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

            const useCase = new FindOneVendaUseCase(this.vendaRepository)
            const venda = await useCase.execute(id)

            if(!venda) return res.status(404).json({ message: "Produto não encontrado" })

            return res.status(200).json(
            {
                message: "Detalhe da venda",
                data: venda
            })
        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }

    async create(req: AuthRequest, res: Response): Promise<Response>
    {
        const MERCADO_PAGO_TOKEN = String(process.env.MERCADO_PAGO_TOKEN)
        const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_TOKEN});

        try
        {
            const dto = new CreateVendaDto(req.body)
            dto.criado_por = Number(req.usuarioId)

            if(dto.qtde <= 0) return res.status(400).json({ message: "Quantidade inválida."})
            
            const useCase = new CreateVendaUseCase(
                this.vendaRepository,
                this.produtoRepositoy
            )

            const venda = await useCase.execute(dto)

            const preference = new Preference(client);

            const preco_total = Number(venda.total)

            const preferenceData = await preference.create({
                body: {
                    items: [
                        {
                            id: String(venda.id),
                            title: "Produto",
                            quantity: dto.qtde,
                            unit_price: preco_total
                        },
                    ],
                },
            });

            const dados_pagamento = {
                id: preferenceData.id,
                link: preferenceData.init_point,
            };

            return res.status(201).json(
            {
                message: "Venda realizada com sucesso.",
                data: venda,
                pagamento: dados_pagamento
            })

        }
        catch(error: any)
        {
            return res.status(400).json({ message: error.message})
        }
    }
}