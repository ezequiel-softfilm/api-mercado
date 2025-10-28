export class CreateVendaDto
{
    id_produto: number
    qtde: number

    constructor(data:
    {
        id_produto: number
        qtde: number
    })
    {
        this.id_produto = data.id_produto
        this.qtde = data.qtde
    }
}