import { CompraEnumStatus } from "../entity/Compra"

export class CreateCompraDto
{
    id_fornecedor: number
    valor_total?: number
    status?: CompraEnumStatus
    observacao?: string
    criado_por?: number
    itens: object

    constructor(data:
    {
        id_fornecedor: number
        valor_total?: number
        status?: CompraEnumStatus
        observacao?: string
        criado_por?: number
        itens: object
    })
    {
        this.id_fornecedor = data.id_fornecedor
        this.valor_total = data.valor_total
        this.status = data.status
        this.observacao = data.observacao
        this.criado_por = data.criado_por
        this.itens = data.itens
    }
}