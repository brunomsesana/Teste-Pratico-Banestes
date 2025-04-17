import { useState, useContext, useEffect } from "react";
import { Cliente } from "../Interfaces/Interfaces";
import AppContext from "../AppContext";

export function Perfil(){
    const [ctxCliente, ctxId] = useContext(AppContext);
    const {dados, setDados} = ctxCliente;
    const {idCliente, setIdCliente} = ctxId;
    const [client, setClient] = useState<Cliente>();
    useEffect(() => {
        console.log(idCliente)
        dados.forEach(element => {
            console.log(element)
            if (element.id == idCliente){
                setClient(element);
            }
        });
    }, [])
    return(
        client ? <>
            <p>Nome: {client.nome}</p>
            <p></p>
        </> : <p>Carregando...</p>
    );
}