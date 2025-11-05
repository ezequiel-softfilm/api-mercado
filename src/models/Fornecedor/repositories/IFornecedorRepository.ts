import { Fornecedor } from "../entity/Fornecedor";

export interface IFornecedorRepository
{
    /**
     * Listar todos os fornecedores
     */
    findAll(): Promise<Fornecedor[]>

    /**
     * Busca um fornecedor por ID
     * @param id 
     */
    findOne(id: number): Promise<Fornecedor | null>

    /**
     * Cria um novo fornecedor
     * @param fornecedor 
     */
    create(fornecedor: Fornecedor): Promise<Fornecedor>

    /**
     * Altera as informações do fornecedor
     * @param id 
     * @param fornecedor 
     */
    update(id: number, fornecedor: Partial<Fornecedor>): Promise<boolean>
    
    /**
     * Realiza uma exclusão lógica
     * @param id 
     */
    excluir(id: number): Promise<boolean>
}