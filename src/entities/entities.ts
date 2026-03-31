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

export type ProdutoProps = {
    nome: string;
    img: StaticImageData;
    desc: string;
    qtd_disp: number;
    preco_venda: number;
    avaliacao: number; // De 0-5
};

// Produtos fake (somente para essa parte inicial sem BD)
export const prods_fake: ProdutoProps[] = [
    {
        nome: "Camiseta Básica",
        img: camiseta,
        desc: "100% algodão",
        qtd_disp: 10,
        preco_venda: 49.9,
        avaliacao: 4,
    },
    {
        nome: "Tênis Esportivo",
        img: tenis,
        desc: "Super confortável",
        qtd_disp: 5,
        preco_venda: 199.9,
        avaliacao: 5,
    },
    {
        nome: "Mochila",
        img: mochila,
        desc: "Ajustável",
        qtd_disp: 8,
        preco_venda: 129.9,
        avaliacao: 3,
    },
    {
        nome: "Boné Street",
        img: bone,
        desc: "Ajustável",
        qtd_disp: 12,
        preco_venda: 39.9,
        avaliacao: 4,
    },
    {
        nome: "Relógio",
        img: relogio,
        desc: "Relógio casual",
        qtd_disp: 6,
        preco_venda: 189.9,
        avaliacao: 4,
    },
    {
        nome: "Jaqueta Jeans",
        img: jaqueta,
        desc: "Estilo moderno",
        qtd_disp: 4,
        preco_venda: 159.9,
        avaliacao: 5,
    },
    {
        nome: "Óculos de Sol",
        img: oculos,
        desc: "Proteção UV",
        qtd_disp: 15,
        preco_venda: 259.9,
        avaliacao: 3,
    },
    {
        nome: "Carteira Couro",
        img: carteira,
        desc: "Compacta",
        qtd_disp: 9,
        preco_venda: 69.9,
        avaliacao: 4,
    },
    {
        nome: "Fone Bluetooth",
        img: fone,
        desc: "Sem fio",
        qtd_disp: 7,
        preco_venda: 149.9,
        avaliacao: 5,
    },
    {
        nome: "Garrafa Térmica",
        img: garrafa,
        desc: "Mantém gelado/quente",
        qtd_disp: 11,
        preco_venda: 79.9,
        avaliacao: 4,
    },
];
