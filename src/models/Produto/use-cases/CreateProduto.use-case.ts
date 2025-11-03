import { ICategoriaRepository } from "../../Categoria/repositories/ICategoriaRepository";
import { CreateProdutoDto } from "../dto/create-produto.dto";
import { Produto } from "../entity/Produto";
import { IProdutoRepository } from "../repositories/IProdutoRepository";
import { CodigoBarraService } from "../services/CodigoBarras.service";

export class CreateProdutoUseCase
{
    constructor(
        private produtoRepository: IProdutoRepository,
        private categoriaRepository: ICategoriaRepository
    ){}

    async execute(dto: CreateProdutoDto): Promise<Produto>
    {
        const categoria = await this.categoriaRepository.findOne(dto.id_categoria)
        if(!categoria) throw new Error("Categoria não encontrada") 

        const base = CodigoBarraService.gerarBaseParaProduto(dto.criado_por || Math.random())
        const codigo_barras = CodigoBarraService.gerarEAN13(base)

        const produto = new Produto(
        {
            nome: dto.nome,
            descricao: dto.descricao,
            codigo_barras: codigo_barras,
            preco_custo: dto.preco_custo,
            preco_venda: dto.preco_venda,
            estoque_atual: dto.estoque_atual,
            estoque_minimo: dto.estoque_minimo,
            id_categoria: dto.id_categoria,
            criado_por: dto.criado_por
        });
        
        const newProduto = await this.produtoRepository.create(produto)

        return newProduto
    }
}