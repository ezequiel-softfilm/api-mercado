import { CategoriaEnumAtivo } from "../entity/Categoria";
import { ICategoriaRepository } from "../repositories/ICategoriaRepository";

export class ExcluirCategoriaUseCase
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async execute(id: number): Promise<boolean>
    {
        const categoria = await this.categoriaRepository.findOne(id)
        if(!categoria) return false

        await this.categoriaRepository.update(id,
        {
            ativo: CategoriaEnumAtivo.Inativo
        })

        const excluirCategoria = await this.categoriaRepository.excluir(id)

        return excluirCategoria
    }
}