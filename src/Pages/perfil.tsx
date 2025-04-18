import { useState, useContext, useEffect } from "react";
import { Agencia, Cliente, Conta } from "../Interfaces/Interfaces";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";

export function Perfil(){
    const [ctxCliente, ctxContas, ctxAgencias, ctxId] = useContext(AppContext);
    const { dadosClientes } = ctxCliente;
    const { dadosAgencias } = ctxAgencias;
    const { ids } = ctxId;
    const { contas } = ids;
    const [client, setClient] = useState<Cliente>();
    const [agency, setAgency] = useState<Agencia[]>([]);
    useEffect(() => {
        dadosClientes.forEach(element => {
            if (element.id == ids.cliente){
                setClient(element);
            }
        });
        setAgency(dadosAgencias.filter((x) => x.codigo.toString() == ids.agencia));
    }, [])
    return(
        <>
            <Link to='/'>Voltar</Link>
            {client ? <>
                <p>Nome: {client.nomeSocial ? client.nomeSocial : client.nome}</p>
                <p>CPF: {client.cpfCnpj}</p>
                <p>RG: {client.rg ? client.rg : "Não registrado"}</p>
                <p>Data de Nascimento: {client.dataNascimento.toString()}</p>
                <p>Email: {client.email}</p>
                <p>Endereço: {client.endereco}</p>
                <p>Renda: R${client.rendaAnual}/Ano</p>
                <p>Patrimônio: R${client.patrimonio}</p>
                <p>Estado Civil: {client.estadoCivil}</p>
                    {
                        agency.length > 0 ? 
                        <Link to={"/agencia"}>
                            <h3>{agency[0].nome}</h3>
                            <p><strong>Código da agência: </strong>{agency[0].codigo}</p>
                            <p><strong>Endereço da agência: </strong>{agency[0].endereco}</p>
                        </Link>
                        :
                        <div>
                            <p>Erro ao localizar agência de código: {client.codigoAgencia}</p>
                        </div>
                    }
                    {
                        contas.length > 0 ? 
                        contas.map((element) => (
                            <div style={{margin: "10px", backgroundColor: "lightgray", padding: "10px"}}>
                                <p>Tipo de conta: {element.tipo}</p>
                                <p>Saldo da conta: {element.saldo}</p>
                                <p>Limite de crédito: {element.limiteCredito}</p>
                                <p>Crédito disponível: {element.creditoDisponivel}</p>
                            </div>
                        ))
                        :
                        <div>
                            <p>Este usuário não possui contas</p>
                        </div>
                    }
                </> : <p>Carregando...</p>}
        </>
    )
}