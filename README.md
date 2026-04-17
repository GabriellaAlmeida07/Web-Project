# Como executar o projeto

### Siga os passos abaixo para rodar a aplicação localmente:

```bash
npm install
npm run dev
```

Após iniciar, o projeto estará disponível em:

http://localhost:3000

# Guia de Navegação e Uso 

Ao rodar o projeto localmente (`localhost:3000`), você será direcionado automaticamente para a rota padrão: **Painel do Vendedor**.

## Área do Vendedor
No Painel do Vendedor, você encontrará um **Header** fixo que permite navegar para as páginas:

* **Adicionar Novo Produto:** Clique no botão `Adicionar Produto` localizado no header.
* **Mensagens Recebidas:** Clique no botão `Ver Mensagens` no header para visualizar o chat com os clientes.
* **Pedidos Recebidos:** Clique no botão `Pedidos Recebidos` no header para visualizar as vendas realizadas.

Para visualizar a página de edição de produto:
* **Editar Produto Existente:** Localize o produto que deseja editar e clique no botão com o **ícone de Lápis** (✎). Isso abrirá a página de edição preenchida.

## Autenticação (Acesso Manual)
Como o sistema está em fase de implementação, utilize as rotas abaixo ou o botão de saída:
* **Login:** Acesse `localhost:3000/Login` ou clique em `Logout` no header.
* **Cadastro:** Acesse `localhost:3000/Cadastro`.

---

## Área do Cliente
Visto que a autenticação ainda não está integrada, o acesso à visão do cliente deve ser feito manualmente via URL:

* **Página Inicial do Cliente:** Acesse `localhost:3000/HomeCliente`.

### Funcionalidades Disponíveis na HomeCliente:
* **Vitrine:** Visualização de todos os produtos disponíveis para compra.
* **Carrinho:** Adição de itens e finalização do pedido.
* **Chat:** Comunicação direta com o vendedor, clique no `ícone de chat` localizado no header da área do cliente.
* **Meus Pedidos:** Para visualizar seu histórico de compras, clique no botão `Pedidos` localizado no header da área do cliente.

---

## Resumo de Rotas Úteis

| Página | Caminho (URL) |
| :--- | :--- |
| Painel do Vendedor | `localhost:3000/` |
| Login | `localhost:3000/Login` |
| Cadastro | `localhost:3000/Cadastro` |
| Home do Cliente | `localhost:3000/HomeCliente` |
