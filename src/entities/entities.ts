import { StaticImageData } from "next/image";
import camiseta from "@/assets/camiseta.jpg";
import tenis from "@/assets/tenis.png";
import mochila from "@/assets/mochila.jpeg";
import bone from "@/assets/bone.jpg";
import relogio from "@/assets/relogio.png";
import jaqueta from "@/assets/jaqueta.jpeg";
import oculos from "@/assets/oculos.png";
import carteira from "@/assets/carteira.png";
import fone from "@/assets/fone.png";
import garrafa from "@/assets/garrafa.png";
import MsgsAdmin from "@/app/(pages)/MsgsAdmin/page";

export type ProdutoProps = {
    id: string;
    nome: string;
    img?: StaticImageData;
    desc: string;
    qtd_disp: number;
    preco_venda: number;
    avaliacao?: number; // De 0-5
};

export type Props = ProdutoProps & {
    quantidade: number;
    preco_venda: number;
    onChangeQtd: (novaQtd: number) => void;
    exibirAvaliacao?: boolean;
};

export type ProdAssociado = {
    prod_id: string; // Para encontrá-lo no bd
    qtd: number;
    preco_venda: number;
};

export interface Pedido {
    id: string;
    prods_associados: ProdAssociado[];
    valor_total: number;
    id_cliente: string; // Para acessar nome, email...
    data_registro: string; // Data de quando o pedido foi criado/cadastrado
    endereco_entrega: string;
}

export type PedidoProps = {
    pedido: Pedido;
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
    msg: Msg; //Como saber alternar bonitinho resposta pergunta resposta pergunta se cliente pode enviar varias msgs abaixo da outra sem resposta
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

// Pedidos fake
export const pedidosFake: Pedido[] = [
    {
        id: "1",
        endereco_entrega: "Rua A, 123",
        data_registro: "12/04/2026",
        id_cliente: "1",
        prods_associados: [
            { prod_id: "003", qtd: 1, preco_venda: 129.9 },
            { prod_id: "002", qtd: 1, preco_venda: 199.9 },
        ],
        valor_total: 329.8,
    },
    {
        id: "2",
        endereco_entrega: "Av. Brasil, 456",
        data_registro: "11/04/2026",
        id_cliente: "2",
        prods_associados: [
            { prod_id: "001", qtd: 2, preco_venda: 49.9 },
            { prod_id: "004", qtd: 1, preco_venda: 39.9 },
        ],
        valor_total: 139.7,
    },
    {
        id: "3",
        endereco_entrega: "Rua das Flores, 789",
        data_registro: "10/04/2026",
        id_cliente: "3",
        prods_associados: [
            { prod_id: "006", qtd: 1, preco_venda: 159.9 },
            { prod_id: "007", qtd: 1, preco_venda: 259.9 },
        ],
        valor_total: 419.8,
    },
];

// Produtos fake (somente para essa parte inicial sem BD)
export const prods_fake: ProdutoProps[] = [
    {
        id: "001",
        nome: "Camiseta Básica",
        img: camiseta,
        desc: "100% algodão",
        qtd_disp: 10,
        preco_venda: 49.9,
        avaliacao: 4,
    },
    {
        id: "002",
        nome: "Tênis Esportivo",
        img: tenis,
        desc: "Super confortável",
        qtd_disp: 5,
        preco_venda: 199.9,
        avaliacao: 5,
    },
    {
        id: "003",
        nome: "Mochila de nome grande para teste",
        img: mochila,
        desc: "Ajustável",
        qtd_disp: 8,
        preco_venda: 129.9,
        avaliacao: 3,
    },
    {
        id: "004",
        nome: "Boné Street",
        img: bone,
        desc: "Ajustável",
        qtd_disp: 12,
        preco_venda: 39.9,
        avaliacao: 4,
    },
    {
        id: "005",
        nome: "Relógio",
        img: relogio,
        desc: "Relógio casual",
        qtd_disp: 6,
        preco_venda: 189.9,
        avaliacao: 4,
    },
    {
        id: "006",
        nome: "Jaqueta Jeans",
        img: jaqueta,
        desc: "Estilo moderno",
        qtd_disp: 4,
        preco_venda: 159.9,
        avaliacao: 5,
    },
    {
        id: "007",
        nome: "Óculos de Sol",
        img: oculos,
        desc: "Proteção UV",
        qtd_disp: 15,
        preco_venda: 259.9,
        avaliacao: 3,
    },
    {
        id: "008",
        nome: "Carteira Couro",
        img: carteira,
        desc: "Compacta",
        qtd_disp: 9,
        preco_venda: 69.9,
        avaliacao: 4,
    },
    {
        id: "009",
        nome: "Fone Bluetooth",
        img: fone,
        desc: "Sem fio",
        qtd_disp: 7,
        preco_venda: 149.9,
        avaliacao: 5,
    },
    {
        id: "010",
        nome: "Garrafa Térmica",
        img: garrafa,
        desc: "Mantém gelado/quente",
        qtd_disp: 11,
        preco_venda: 79.9,
        avaliacao: 4,
    },
];
