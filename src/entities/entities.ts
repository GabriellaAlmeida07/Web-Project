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

export type Msg = {
    id?: number;
    id_remetente: number;
    tipo_remetente: "vendedor" | "cliente"; 
    id_cliente: number;
    data_envio: string;
    conteudo: string;
}

export type MsgProps = {
    loading?: boolean;
    cliente: UsuarioProps;
    onResponder: () => void;
};