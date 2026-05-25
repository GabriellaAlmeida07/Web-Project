import { ProdutoController } from "@/controllers/produto.controller";

export const runtime = "nodejs";

type Params = {
    params: Promise<{ id: string }>;
};

// Use pedido.controller.ts

// Chame essa rota no componente cardPedido ao clicar no botão de editar
// export async function PUT() {
//     try {
        // Fução do controller
//         controller.suaFuncaoDeEdicaoDoPedido();
//     } catch (error) {

//     }
// }

// Chame essa rota no componente cardPedido ao clicar no botão de excluir
// export async function DELETE() {
//     try {
        // Fução do controller
//         controller.suaFuncaoDeDelecaoDoPedido();
//     } catch (error) {

//     }
// }
