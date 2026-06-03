import Mensagem from "@/models/mensagem.model";
import Usuario from "@/models/usuario.model";

export class MensagemController {
    async cadastrarMsg(data: any) {
        const msg = await Mensagem.create({
            id: data.id,
            id_remetente: data.id_remetente,
            id_cliente: data.id_cliente,
            conteudo: data.conteudo,
            data_envio: data.data_envio,
            tipo_remetente: data.tipo_remetente,
        });

        return msg;
    }

    async findAllMsgsCliente(id: number) {
        return await Mensagem.findAll({
            where: {
                id_cliente: id,
            },
            order: [["data_envio", "ASC"]],
        });
    }

    async findClientesComMensagens() {
        const mensagens = await Mensagem.findAll({
            attributes: ["id_cliente"],
            include: [
                {
                    model: Usuario,
                    as: "cliente",
                    attributes: ["id", "nome", "email"],
                },
            ],
            order: [["data_envio", "DESC"]],
        });
    
        const mapa = new Map();
    
        mensagens.forEach((msg: any) => {
            if (!mapa.has(msg.id_cliente)) {
                mapa.set(msg.id_cliente, {
                    id: msg.id_cliente,
                    nome: msg.cliente?.nome,
                    email: msg.cliente?.email,
                });
            }
        });
    
        return Array.from(mapa.values());
    }
}
