import { CompraItens } from "../entity/CompraItens";

export interface ICompraItensRepository
{
    /**
     * Busca todos os itens da compra
     * @param id_compra 
     */
    findItensCompra(id_compra: number): Promise<CompraItens[] | null>

    /**
     * Busca um item da compra
     * @param id_compra 
     * @param id_produto 
     */
    findItemCompra(id: number): Promise<CompraItens | null>

    /**
     * Cria um item na compra
     * @param compraItens 
     */
    create(compraItens: CompraItens[]): Promise<CompraItens[]>

    /**
     * Altera as informações do item da compra
     * @param id 
     * @param compraItens 
     */
    update(id: number, compraItens: Partial<CompraItens>): Promise<boolean>

    /**
     * Realiza exclusão lógica do item na compra
     * @param id 
     */
    excluir(id: number): Promise<boolean>
}