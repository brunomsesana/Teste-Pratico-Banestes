import AppContext from "./AppContext";
import { Cliente } from "./Interfaces/Interfaces";
import React, { useState } from "react";

const AppProvider : React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [dados, fornecerDados] = useState<Cliente[]>([]);
    const [idCliente, fornecerIdCliente] = useState<string>("");

    const setDados = (novosDados : Cliente[]) => {
        fornecerDados(novosDados)
    }

    const setIdCliente = (novoIdCCliente : string) => {
        fornecerIdCliente(novoIdCCliente)
    }

    return(
        <AppContext.Provider value={[{dados, setDados}, {idCliente, setIdCliente}]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider