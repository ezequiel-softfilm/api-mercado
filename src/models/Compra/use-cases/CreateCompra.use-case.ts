import { CreateCompraItensDto } from "../../CompraItens/dto/create-compraItens.dto";
import { ICompraItensRepository } from "../../CompraItens/repositories/ICompraItensRepository";
import { CreateCompraItensUseCase } from "../../CompraItens/use-cases/CreateCompraItens.use-case";
import { IFornecedorRepository } from "../../Fornecedor/repositories/IFornecedorRepository";
import { IProdutoRepository } from "../../Produto/repositories/IProdutoRepository";
import { CreateCompraDto } from "../dto/create-compra.dto";
import { Compra } from "../entity/Compra";
import { ICompraRepository } from "../repositories/ICompraRepository";

export class CreateCompraUseCase
{
    constructor(
        private compraRepository: ICompraRepository,
        private fornecedorRepository: IFornecedorRepository,
        private compraItensRepository: ICompraItensRepository,
        private produtoRepository: IProdutoRepository
    ){}

    async execute(dto: CreateCompraDto): Promise<Compra>
    {
        const fornecedor = await this.fornecedorRepository.findOne(dto.id_fornecedor)
        if(!fornecedor) throw new Error("Fornecedor não encontrado.")

        const compra = new Compra(
        {
            id_fornecedor: dto.id_fornecedor,
            valor_total: dto.valor_total,
            status: dto.status,
            observacao: dto.observacao,
            criado_por: dto.criado_por
        })

        const newCompra = await this.compraRepository.create(compra)

        const dtoItens = new CreateCompraItensDto(Object(dto.itens))

        const useCaseItens = new CreateCompraItensUseCase(
            this.compraItensRepository,
            this.compraRepository,
            this.produtoRepository
        )

        const newCompraItens = await useCaseItens.execute(Object(dtoItens))

        const returnCompra = {...newCompra, newCompraItens}

        return returnCompra
    }
}