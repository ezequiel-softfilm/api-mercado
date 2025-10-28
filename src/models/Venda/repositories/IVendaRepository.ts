import { Venda } from "../entity/Venda";

export interface IVendaRepository
{
    findAll(): Promise<Venda[]>

    /**
     * Busca venda de um produto
     * @param id
     */
    findOne(id: number): Promise<Venda | null>

    /**
     * Cria venda de um produto
     * @param venda 
     */
    create(venda: Venda): Promise<Venda>
}