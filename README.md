# Teste Prático - Estágio Banestes

Este repositório contém a implementação de um **teste prático** desenvolvido para o processo seletivo de **estágio** na empresa **Banestes**. A aplicação foi construída utilizando **React** e **TypeScript** para demonstrar habilidades em **desenvolvimento front-end** e **integração com APIs**.

## Acesso

Você pode acessar uma versão online desse projeto em https://brunomsesana.github.io/teste-pratico-banestes

## Descrição

A aplicação consiste em um sistema bancário simples que permite visualizar e gerenciar clientes, contas e agências. Ela consome dados provenientes de planilhas públicas (Google Sheets) para popular as informações de clientes, contas e agências, e permite a navegação entre as páginas de perfil, agências e clientes.

### Funcionalidades:

- **Visualização de Clientes:** Exibe uma lista de clientes com detalhes como nome, CPF, endereço, renda, patrimônio, entre outros.
- **Visualização de Agências:** Permite ver os detalhes das agências, como nome, código e endereço.
- **Perfil do Cliente:** Exibe informações detalhadas sobre o cliente selecionado, incluindo suas contas bancárias associadas à agência.
- **Navegação entre Páginas:** A navegação é feita através de links e componentes React Router, com paginação para exibir os dados de maneira organizada.
- **Filtros e Pesquisa:** Funcionalidade para filtrar e pesquisar clientes.

## Tecnologias Utilizadas

- **React**: Biblioteca para criação de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **React Router**: Biblioteca para navegação entre páginas.
- **CSS Modules**: Abordagem para evitar conflitos de nome de classe no CSS.
- **Context API**: Utilizada para gerenciar o estado global da aplicação.
- **Google Sheets API**: Utilizada para consumir dados armazenados em planilhas do Google.

## Estrutura do Projeto

- **/src**: Contém os componentes principais da aplicação.
  - **/Components**: Componentes reutilizáveis como cabeçalho, filtros e listas.
  - **/Pages**: Páginas principais da aplicação como Home, Perfil e Agências.
  - **/Interfaces**: Tipos e interfaces TypeScript para dados.
  - **/AppContext**: Contexto global utilizado para gerenciar dados de clientes, contas e agências.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/brunomsesana/Teste-Pratico-Banestes.git

2. **Navegue até o diretório do projeto:**

    ```bash
    cd teste-pratico-banestes

3. **Instale as dependências:**

    ```bash
    npm install

4. **Execute o projeto**

    ```bash
    npm run dev

## Considerações Finais

Este projeto foi desenvolvido como parte de um **teste prático** para o processo seletivo de estágio no **Banestes**. A ideia é demonstrar as habilidades em desenvolvimento front-end e integração com APIs externas. Algumas melhorias podem ser feitas para ampliar a funcionalidade e otimizar o desempenho.