import { Categoria } from "../entity/Categoria";
import { ICategoriaRepository } from "../repositories/ICategoriaRepository";

export class UpdateCategoriaUseCase
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async execute(id: number, categoria: Partial<Categoria>): Promise<boolean>
    {
        if(!categoria.nome || categoria.nome === "") throw new Error("Nome é obrigatório")

        const updateCategoria = await this.categoriaRepository.update(id, categoria)

        return updateCategoria
    }
}