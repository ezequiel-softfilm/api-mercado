import { Produto } from "../entity/Produto";

export interface IProdutoRepository
{
    findAll(): Promise<Produto[]>

    /**
     * Busca um produto pelo ID
     * @param id 
     */
    findOne(id: number): Promise<Produto | null>

    /**
     * Cria um novo produto.
     * @param produto
     */
    create(produto: Produto): Promise<Produto>

    /**
     * Altera as informações de um produto
     * @param id 
     * @param produto 
     */
    update(id: number, produto: Partial<Produto>): Promise<boolean>

    /**
     * Realiza uma exclusão lógica
     * @param id 
     */
    excluir(id: number): Promise<boolean>
}