export class CreateVendaDto
{
    id_produto: number
    qtde: number
    criado_por: number

    constructor(data:
    {
        id_produto: number
        qtde: number
        criado_por: number
    })
    {
        this.id_produto = data.id_produto
        this.qtde = data.qtde
        this.criado_por = data.criado_por
    }
}