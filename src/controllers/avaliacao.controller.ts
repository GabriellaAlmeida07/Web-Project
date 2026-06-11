import { Avaliacao } from "@/models/avaliacao.model";

export interface AvaliacaoProps {
    id_produto: number;
    id_cliente: number;
    nota: number;
}

export class AvaliacaoController {
    
    // Cadastra uma nota ou atualiza a existente (Evita duplicados no mesmo produto pelo mesmo cliente)
    async cadastrarAvaliacao(data: AvaliacaoProps) {
        try {
            // Procurar se esse cliente já avaliou esse produto antes
            const avaliacaoExistente = await Avaliacao.findOne({
                where: {
                    id_produto: data.id_produto,
                    id_cliente: data.id_cliente
                }
            });

            // Se já existir avaliacao, apenas atualiza a nota antiga com o novo valor.
            if (avaliacaoExistente) {
                return await avaliacaoExistente.update({ nota: data.nota });
            }

            // Se for a primeira vez, aí sim cria uma linha nova no banco
            const avaliacao = await Avaliacao.create({
                id_produto: data.id_produto,
                id_cliente: data.id_cliente,
                nota: data.nota,
            });

            return avaliacao;
        } catch (err) {
            console.error("ERRO AO CADASTRAR AVALIAÇÃO:", err);
            throw err;
        }
    }

    // Função para puxar as avaliações e mostrar na tela do produto
    async buscarAvaliacoesPorProduto(id_produto: number) {
        try {
            const avaliacoes = await Avaliacao.findAll({
                where: {
                    id_produto: id_produto,
                },
            });

            return avaliacoes.map((av: any) => av.toJSON());
        } catch (err) {
            console.error("ERRO AO BUSCAR AVALIAÇÕES:", err);
            throw err;
        }
    }
}