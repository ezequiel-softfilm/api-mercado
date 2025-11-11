export enum CompraEnumStatus
{
    Registrada = "Registrada",
    Recebida = "Recebida",
    Parcial = "Parcial",
    Cancelada = "Cancelada"
}

export class Compra
{
    public id?: number
    public id_fornecedor: number
    public valor_total?: number
    public status?: CompraEnumStatus
    public observacao?: string
    public criado_por?: number
    public criado_em?: Date
    public alterado_em?: Date
    public deletado_em?: Date | null

    constructor(props:
    {
        id_fornecedor: number,
        valor_total?: number
        status?: CompraEnumStatus
        observacao?: string
        criado_por?: number
    }, id?: number)
    {
        this.id_fornecedor = props.id_fornecedor
        this.valor_total = props.valor_total
        this.status = props.status || CompraEnumStatus.Registrada
        this.observacao = props.observacao
        this.criado_por = props.criado_por

        if(id) this.id = id
    }
}