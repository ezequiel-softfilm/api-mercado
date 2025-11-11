import { Compra } from "../entity/Compra";

export interface ICompraRepository
{
    /**
     * Buscar todas as compras
     */
    findAll(): Promise<Compra[]>

    /**
     * Busca uma compra pelo ID
     * @param id 
     */
    findOne(id: number): Promise<Compra | null>

    /**
     * Cria uma nova compra
     * @param compra 
     */
    create(compra: Compra): Promise<Compra>

    /**
     * Altera as informações de uma compra
     * @param id 
     * @param compra 
     */
    update(id: number, compra: Partial<Compra>): Promise<boolean>

    /**
     * Realiza exclusão lógica de uma compra
     * @param id 
     */
    excluir(id: number): Promise<boolean>
}