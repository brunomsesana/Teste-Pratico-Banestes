import React from "react";
import { Agencia, Cliente, Conta } from "./Interfaces/Interfaces";

/**
 * AppContext
 * --------------
 * Contexto global que armazena e compartilha dados de clientes, contas, agências e IDs.
 * 
 * O `React.createContext` é utilizado para criar um contexto que contém os dados compartilhados entre os componentes:
 * - `dadosClientes`: Lista de clientes.
 * - `setDadosClientes`: Função para atualizar a lista de clientes.
 * - `dadosContas`: Lista de contas.
 * - `setDadosContas`: Função para atualizar a lista de contas.
 * - `dadosAgencias`: Lista de agências.
 * - `setDadosAgencias`: Função para atualizar a lista de agências.
 * - `ids`: Contém os dados do cliente, contas e agência atualmente selecionados.
 * - `setIds`: Função para atualizar os IDs do cliente, contas e agência.
 */

// Cria o contexto global para a aplicação com os tipos definidos
const AppContext = React.createContext<
    [
        {dadosClientes: Cliente[]; setDadosClientes: (novosDadosClientes: Cliente[]) => void},
        {dadosContas: Conta[]; setDadosContas: (novosDadosContas: Conta[]) => void},
        {dadosAgencias: Agencia[]; setDadosAgencias: (novosDadosAgencias: Agencia[]) => void},
        {ids: {cliente: string, contas: Conta[], agencia: string}, setIds: (novoIds: {cliente: string, contas: Conta[], agencia: string}) => void}
    ]
>(
    // Valores iniciais do contexto: listas vazias e funções que retornam listas vazias ou objetos padrão
    [
        {dadosClientes: [], setDadosClientes: () => []},
        {dadosContas: [], setDadosContas: () => []},
        {dadosAgencias: [], setDadosAgencias: () => []},
        {ids: {cliente: "", contas: [], agencia: ""}, setIds: () => {return({cliente: "", contas: [], agencia: ""})}}
    ]
);

export default AppContext;
