import { Categoria } from "../entity/Categoria";
import { ICategoriaRepository } from "../repositories/ICategoriaRepository";

export class FindOneCategoriaUseCase
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async execute(id: number): Promise<Categoria | null>
    {
        const categoria = await this.categoriaRepository.findOne(id)

        if(!categoria) return null

        return categoria
    }
}