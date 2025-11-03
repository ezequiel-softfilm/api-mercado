import { Categoria } from "../entity/Categoria";
import { CategoriaModel } from "./CategoriaModel";
import { ICategoriaRepository } from "./ICategoriaRepository";

export class CategoriaRepository implements ICategoriaRepository
{
    async findAll(): Promise<Categoria[]>
    {
        const categorias = await CategoriaModel.findAll()

        return categorias
    }

    async findOne(id: number): Promise<Categoria | null>
    {
        const categoria = await CategoriaModel.findByPk(id)

        if(!categoria) return null

        return categoria
    }

    async create(categoria: Categoria): Promise<Categoria>
    {
        const newCategoria = await CategoriaModel.create(
        {
            nome: categoria.nome,
            descricao: categoria.descricao,
            ativo: categoria.ativo,
            criado_por: categoria.criado_por
        })    

        return newCategoria
    }

    async update(id: number, categoria: Partial<Categoria>): Promise<boolean>
    {
        const [updateCategoria] = await CategoriaModel.update(categoria, { where: { id }})    

        return updateCategoria > 0
    }

    async excluir(id: number): Promise<boolean>
    {
        const excluirCategoria = await CategoriaModel.destroy({ where: { id } })

        return excluirCategoria > 0
    }
}