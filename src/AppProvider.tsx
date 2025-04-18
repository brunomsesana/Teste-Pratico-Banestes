import AppContext from "./AppContext";
import { Agencia, Cliente, Conta } from "./Interfaces/Interfaces";
import React, { useState } from "react";

const AppProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [dadosClientes, fornecerDadosClientes] = useState<Cliente[]>([]);
    const [dadosContas, fornecerDadosContas] = useState<Conta[]>([]);
    const [dadosAgencias, fornecerDadosAgencias] = useState<Agencia[]>([]);
    const [ids, fornecerIds] = useState<{cliente: string, contas: Conta[], agencia: string}>({cliente: "", contas: [], agencia: ""});

    const setDadosClientes = (novosDadosClientes : Cliente[]) => {
        fornecerDadosClientes(novosDadosClientes)
    }

    const setDadosContas = (novosDadosContas : Conta[]) => {
        fornecerDadosContas(novosDadosContas)
    }

    const setDadosAgencias = (novosDadosAgencias : Agencia[]) => {
        fornecerDadosAgencias(novosDadosAgencias)
    }

    const setIds = (novoIds : {cliente: string, contas: Conta[], agencia: string}) => {
        fornecerIds(novoIds)
    }

    return(
        <AppContext.Provider value={[{dadosClientes, setDadosClientes}, {dadosContas, setDadosContas}, {dadosAgencias, setDadosAgencias}, {ids, setIds}]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider