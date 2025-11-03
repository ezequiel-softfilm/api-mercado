export class CodigoBarraService {
    static gerarEAN13(base: string): string {
        if (base.length !== 12)
        {
            throw new Error("A base deve ter exatamente 12 dígitos")
        }

        let soma = 0
        for (let i = 0; i < 12; i++)
            {
            const num = parseInt(base[i])
            soma += i % 2 === 0 ? num : num * 3
        }

        const resto = soma % 10
        const digitoVerificador = resto === 0 ? 0 : 10 - resto

        return `${base}${digitoVerificador}`
    }

    static gerarBaseParaProduto(id_usuario: number): string
    {
        const timestamp = Date.now().toString().slice(-6)
        const aleatorio = Math.floor(100 + Math.random() * 900).toString()

        let base = `${id_usuario}${timestamp}${aleatorio}`

        if (base.length < 12)
            base = base.padStart(12, "0")
        else if (base.length > 12)
            base = base.slice(0, 12)

        return base
    }
}
