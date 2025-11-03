import { Venda } from "../entity/Venda";

export interface IVendaRepository
{
    /**
     * Listar todas as vendas
     */
    findAll(): Promise<Venda[]>

    /**
     * Busca detalhes da venda
     * @param id
     */
    findOne(id: number): Promise<Venda | null>

    /**
     * Cria venda de um produto
     * @param venda 
     */
    create(venda: Venda): Promise<Venda>
}