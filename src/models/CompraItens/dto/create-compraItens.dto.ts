export class CreateCompraItensDto
{
    id_compra: number
    id_produto: number
    quantidade: number
    preco_unitario: number
    subtotal?: number

    constructor(data:
    {
        id_compra: number
        id_produto: number
        quantidade: number
        preco_unitario: number
        subtotal?: number
    })
    {
        this.id_compra = data.id_compra
        this.id_produto = data.id_produto
        this.quantidade = data.quantidade
        this.preco_unitario = data.preco_unitario
        this.subtotal = data.subtotal
    }
}