import { useContext, useState } from "react";
import AppContext from "../AppContext";
import { Cliente } from "../Interfaces/Interfaces";
export default function Filters({setListaFiltrada, setListaAtual, setTamAtual}: {setListaFiltrada: Function, setListaAtual: Function, setTamAtual: Function}){
    const [ctxCliente, ctxContas, ctxAgencias] = useContext(AppContext);
    const { dadosClientes } = ctxCliente;
    const { dadosAgencias } = ctxAgencias;
    function handleFilterNome(searchStr: string){
        const resultado = searchStr !== "" ?
        dadosClientes.filter((x) => x.nome.toLowerCase().includes(searchStr.toLowerCase())) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    function handleFilterCPF(searchStr: string){
        const resultado = searchStr !== "" ?
        dadosClientes.filter((x) => x.cpfCnpj.includes(searchStr)) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    function handleFilterAgencia(codAgencia: string){
        const resultado = codAgencia !== "" ?
        dadosClientes.filter((x) => x.codigoAgencia.toString() == codAgencia) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    return(
        <div>
            <input type="text" placeholder='Nome' onChange={(e) => {handleFilterNome(e.target.value)}} />
            <input type="number" placeholder='CPF/CNPJ' onChange={(e) => {handleFilterCPF(e.target.value)}} />
            <select name="agencia" id="agencia" onChange={(e) => {handleFilterAgencia(e.target.value)}}>
                <option value="" selected>Agência</option>
                {dadosAgencias.map((element) => (
                    <option key={element.id} value={element.codigo}>{element.nome}</option>
                ))}
            </select>
        </div>
    )
}