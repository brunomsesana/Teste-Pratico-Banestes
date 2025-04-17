import React from "react";
import { Cliente } from "./Interfaces/Interfaces";

const AppContext = React.createContext<
    [
        {dados: Cliente[]; setDados: (novosDados: Cliente[]) => void}, 
        {idCliente: string, setIdCliente: (novoIdCliente: string) => void}
    ]
>
(
    [
        {dados: [], setDados: () => []}, 
        {idCliente: "", setIdCliente: () => ""}
    ]
);

export default AppContext;