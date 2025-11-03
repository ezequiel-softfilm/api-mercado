import { CreateCategoriaDto } from "../dto/create-categoria";
import { Categoria } from "../entity/Categoria";
import { ICategoriaRepository } from "../repositories/ICategoriaRepository";

export class CreateCategoriaUseCase
{
    constructor(private categoriaRepository: ICategoriaRepository){}

    async execute(dto: CreateCategoriaDto): Promise<Categoria>
    {
        const categoria = new Categoria(
        {
            nome: dto.nome,
            descricao: dto.descricao,
            criado_por: dto.criado_por
        })

        const newCategoria = await this.categoriaRepository.create(categoria)

        return newCategoria
    }
}