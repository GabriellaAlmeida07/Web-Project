import { StaticImageData } from "next/image";

export type ProdutoProps = {
    id: number;
    nome: string;
    img_url?: StaticImageData;
    descricao: string;
    qtd_estoque: number;
    preco: number;
    avaliacao?: number; // De 0-5

    tipo?: "vendedor" | "cliente"; // Para sabermos o tipo de usuário logado
};

export type Props = ProdutoProps & {
    quantidade: number;
    preco: number;
    onChangeQtd: (novaQtd: number) => void;
    exibirAvaliacao?: boolean;
};

export type UsuarioProps = {
    id: number;
    nome: string;
    cpf?: string;
    celular?: string;
    email: string;
    senha_hash: string;
    tipo: string;
};

export type ItemPedidoProps = {
    id_produto: number;
    qtd: number;
    preco_unitario: number;
};

export type PedidoProps = {
    id?: number;
    data_registro: string;
    endereco_entrega: string;
    valor_total: number;
    entregue: boolean;
    id_cliente?: number;
    itens: ItemPedidoProps[];
    Usuario?: UsuarioProps;
};

export interface Msg {
    id: string;
    assunto: string;
    nome_cliente: string;
    id_cliente: string;
    data_registro: string;
    conteudo: string;
    autor: "cliente" | "vendedor";
}

export type MsgProps = {
    msg: Msg;
    onResponder: (msg: Msg) => void;
};

// Msgs fake
export const msgs_fake: Msg[] = [
    {
        id: "1",
        assunto: "Dúvida sobre produto",
        nome_cliente: "Maria",
        id_cliente: "1",
        data_registro: "14/04/2026",
        conteudo: "Esse produto tem garantia?",
        autor: "cliente",
    },
    {
        id: "2",
        assunto: "Entrega",
        nome_cliente: "João",
        id_cliente: "2",
        data_registro: "13/04/2026",
        conteudo: "Qual o prazo de entrega?",
        autor: "cliente",
    },
];