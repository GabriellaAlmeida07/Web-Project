# Como executar o projeto

Siga os passos abaixo para executar a aplicação localmente:

```bash
npm install
npm run dev
```

Após iniciar, o projeto estará disponível em:

```
http://localhost:3000
```

# Guia de Navegação e Uso

## Autenticação

Ao iniciar a aplicação, será exibida a tela de **Login**.

Você pode testar a funcionalidade de cadastro clicando em **Cadastre-se** ou utilizar um dos usuários de teste abaixo:

| Tipo de usuário | E-mail               | Senha  |
| --------------- | -------------------- | ------ |
| Cliente         | `cliente@gmail.com`  | `1234` |
| Vendedor        | `vendedor@gmail.com` | `1234` |

---

# Área do Cliente

Ao entrar como **Cliente**, você terá acesso às seguintes funcionalidades:

## Comprar produtos

A página inicial exibe todos os produtos disponíveis na loja.

Para adicionar produtos ao carrinho, você pode:

* Informar diretamente a quantidade desejada no card do produto;
* Utilizar os botões **+** e **−** presentes em cada card para aumentar ou diminuir a quantidade.

## Carrinho

Clique no **ícone de carrinho** localizado no header para visualizar os produtos adicionados.

Ao finalizar a compra:

1. Clique em **Prosseguir**;
2. Informe o endereço/local de entrega;
3. Clique em **Confirmar**.

O pedido será enviado ao vendedor.

## Meus Pedidos

Clique na opção **Pedidos** no header para visualizar todo o histórico de compras.

Para cada pedido é possível:

* Visualizar os produtos pertencentes ao pedido através do botão **Ver Produtos**;
* Avaliar produtos que já foram entregues;
* Editar o pedido enquanto ele ainda não tiver sido marcado como entregue pelo vendedor;
* Cancelar o pedido antes da entrega.

## Chat

O cliente pode conversar diretamente com o vendedor clicando no **ícone de chat** localizado no header.

---

# Área do Vendedor

Ao entrar como **Vendedor**, será exibido o painel de gerenciamento da loja.

## Gerenciamento de Produtos

Em cada card de produto é possível:

* Editar o produto através do **ícone de lápis**;
* Excluir o produto através do **ícone de lixeira**.

Também é possível adicionar novos produtos:

* Pelo botão disponível no **header** em telas maiores;
* Pelo **menu hambúrguer** em telas menores.

## Mensagens

Na opção **Mensagens**, o vendedor pode:

* Visualizar todas as conversas iniciadas pelos clientes;
* Responder dúvidas e continuar o atendimento através do chat.

## Pedidos Recebidos

Na opção **Pedidos Recebidos**, o vendedor pode:

* Visualizar todos os pedidos da loja;
* Ver os produtos pertencentes a cada pedido;
* Identificar pedidos entregues e não entregues;
* Marcar um pedido como **Entregue**.

---

# Logout

Tanto clientes quanto vendedores possuem a opção de **Sair (Logout)** disponível no header da aplicação.

Ao realizar o logout, o usuário será redirecionado para a tela de login.
