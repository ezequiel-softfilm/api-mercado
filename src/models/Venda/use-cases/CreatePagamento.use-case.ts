import { IProdutoRepository } from "../../Produto/repositories/IProdutoRepository";
import { Venda } from "../entity/Venda";
import { IVendaRepository } from "../repositories/IVendaRepository";
import { MercadoPagoConfig, Preference } from 'mercadopago';

export class DadosPagamento
{
    public id: string
    public link: string

    constructor(data:
    {
        id: string,
        link: string
    })
    {
        this.id = data.id
        this.link = data.link
    }
}

export class CreatePagamentoUseCase
{
    constructor(
        private produtoRepository: IProdutoRepository
    ){}

    async execute(dto: Venda): Promise<any>
    {
        const MERCADO_PAGO_TOKEN = String(process.env.MERCADO_PAGO_TOKEN)
        const client = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_TOKEN})

        const produto = await this.produtoRepository.findOne(dto.id_produto)
        if(!produto) return null

        const preference = new Preference(client)

        const preferenceData = await preference.create(
        {
            body:
            {
                items:
                [
                    {
                        id: String(dto.referencia),
                        title: produto.nome,
                        quantity: dto.qtde,
                        unit_price: Number(produto.preco_venda)
                    }
                ]
            }
        })

        return new DadosPagamento(
        {
            id: String(preferenceData.id),
            link: String(preferenceData.init_point)
        })
    }
}