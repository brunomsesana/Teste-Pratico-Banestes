import AppContext from "./AppContext";
import { Agencia, Cliente, Conta } from "./Interfaces/Interfaces";
import React, { useState } from "react";

/**
 * AppProvider
 * -------------------
 * Este componente provê o estado global para a aplicação utilizando o contexto `AppContext`.
 * Ele mantém os dados relacionados a clientes, contas, agências e os IDs do cliente selecionado.
 * O `AppProvider` permite que qualquer componente filho acesse ou modifique esses dados através do contexto.
 * 
 * - `dadosClientes`: Armazena a lista de clientes.
 * - `dadosContas`: Armazena a lista de contas.
 * - `dadosAgencias`: Armazena a lista de agências.
 * - `ids`: Armazena os IDs do cliente, contas e agência atuais.
 * 
 * O `AppContext.Provider` é usado para fornecer os dados e as funções de atualização para o restante da aplicação.
 */

const AppProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {
    // Estado para armazenar os dados de clientes, contas, agências e os IDs
    const [dadosClientes, fornecerDadosClientes] = useState<Cliente[]>([]);
    const [dadosContas, fornecerDadosContas] = useState<Conta[]>([]); 
    const [dadosAgencias, fornecerDadosAgencias] = useState<Agencia[]>([]);
    const [ids, fornecerIds] = useState<{cliente: string, contas: Conta[], agencia: string}>({cliente: "", contas: [], agencia: ""});

    // Funções para atualizar os dados nos estados
    /** Atualiza a lista de clientes */
    const setDadosClientes = (novosDadosClientes : Cliente[]) => {
        fornecerDadosClientes(novosDadosClientes);
    }

    /** Atualiza a lista de contas */
    const setDadosContas = (novosDadosContas : Conta[]) => {
        fornecerDadosContas(novosDadosContas);
    }

    /** Atualiza a lista de agências */
    const setDadosAgencias = (novosDadosAgencias : Agencia[]) => {
        fornecerDadosAgencias(novosDadosAgencias);
    }

    /** Atualiza os IDs do cliente, contas e agência */
    const setIds = (novoIds : {cliente: string, contas: Conta[], agencia: string}) => {
        fornecerIds(novoIds);
    }

    return(
        <AppContext.Provider value={[{dadosClientes, setDadosClientes}, {dadosContas, setDadosContas}, {dadosAgencias, setDadosAgencias}, {ids, setIds}]}>
            {children} {/* Renderiza os componentes filhos dentro do contexto */}
        </AppContext.Provider>
    )
}

export default AppProvider;
