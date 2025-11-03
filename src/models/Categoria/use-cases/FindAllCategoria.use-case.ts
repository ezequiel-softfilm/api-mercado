import { Categoria } from "../entity/Categoria";
import { ICategoriaRepository } from "../repositories/ICategoriaRepository";

export class FindAllCategoriaUseCase
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async execute(): Promise<Categoria[]>
    {
        const categorias = await this.categoriaRepository.findAll()

        return categorias
    }
}