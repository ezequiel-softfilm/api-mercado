import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "./IProdutoRepository";
import { ProdutoModel } from "./ProdutoModel";

export class ProdutoRepository implements IProdutoRepository
{
    async findAll(): Promise<Produto[]>
    {
        const produtos = await ProdutoModel.findAll()

        return produtos
    }

    async findOne(id: number): Promise<Produto | null>
    {
        const produto = await ProdutoModel.findByPk(id)
        
        if(!produto) return null

        return produto
    }

    async create(produto: Produto): Promise<Produto>
    {
        const newProduto = await ProdutoModel.create(
        {
            nome: produto.nome,
            descricao: produto.descricao,
            codigo_barras: produto.codigo_barras,
            preco_custo: produto.preco_custo,
            preco_venda: produto.preco_venda,
            estoque_atual: produto.estoque_atual,
            estoque_minimo: produto.estoque_minimo,
            id_categoria: produto.id_categoria,
            ativo: produto.ativo,
            criado_por: produto.criado_por
        })

        return newProduto
    }

    async update(id: number, produto: Partial<Produto>): Promise<boolean>
    {
        const [updateProduto] = await ProdutoModel.update(produto, {where: { id }})   
        
        return updateProduto > 0
    }

    async excluir(id: number): Promise<boolean>
    {
        const excluirProduto = await ProdutoModel.destroy({ where: { id }})    

        return excluirProduto > 0
    }
}