import React from "react";
import { Agencia, Cliente, Conta } from "./Interfaces/Interfaces";

const AppContext = React.createContext<
    [
        {dadosClientes: Cliente[]; setDadosClientes: (novosDadosClientes: Cliente[]) => void},
        {dadosContas: Conta[]; setDadosContas: (novosDadosContas: Conta[]) => void},
        {dadosAgencias: Agencia[]; setDadosAgencias: (novosDadosAgencias: Agencia[]) => void},
        {ids: {cliente: string, contas: Conta[], agencia: string}, setIds: (novoIds: {cliente: string, contas: Conta[], agencia: string}) => void}
    ]
>
(
    [
        {dadosClientes: [], setDadosClientes: () => []},
        {dadosContas: [], setDadosContas: () => []},
        {dadosAgencias: [], setDadosAgencias: () => []},
        {ids: {cliente: "", contas: [], agencia: ""}, setIds: () => {return({cliente: "", contas: [], agencia: ""})}}
    ]
);

export default AppContext;