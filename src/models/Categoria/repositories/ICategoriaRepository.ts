import { Categoria } from "../entity/Categoria";

export interface ICategoriaRepository
{
    /**
     * Listar todas as categorias
     */
    findAll(): Promise<Categoria[]>

    /**
     * Busca categoria pelo ID
     * @param id
     */
    findOne(id: number): Promise<Categoria | null>

    /**
     * Criar uma categoria
     * @param categoria 
     */
    create(categoria: Categoria): Promise<Categoria>

    /**
     * Alterar as informações de categoria
     * @param id 
     * @param categoria 
     */
    update(id: number, categoria: Partial<Categoria>): Promise<boolean>

    /**
     * Excluir uma categoria
     * @param id 
     */
    excluir(id: number): Promise<boolean>
}