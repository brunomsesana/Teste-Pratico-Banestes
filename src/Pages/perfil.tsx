import { useState, useContext, useEffect } from "react";
import { Agencia, Cliente } from "../Interfaces/Interfaces";
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
                <p><strong>Nome: </strong>{client.nomeSocial ? client.nomeSocial : client.nome}</p>
                <p><strong>CPF: </strong>{client.cpfCnpj}</p>
                <p><strong>RG: </strong>{client.rg ? client.rg : "Não registrado"}</p>
                <p><strong>Data de Nascimento: </strong>{client.dataNascimento.toString()}</p>
                <p><strong>Email: </strong>{client.email}</p>
                <p><strong>Endereço: </strong>{client.endereco}</p>
                <p><strong>Renda: </strong>R${client.rendaAnual}/Ano</p>
                <p><strong>Patrimônio: </strong>R${client.patrimonio}</p>
                <p><strong>Estado Civil: </strong>{client.estadoCivil}</p>
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
                                <p><strong>Tipo de conta: </strong>{element.tipo}</p>
                                <p><strong>Saldo da conta: </strong>{element.saldo}</p>
                                <p><strong>Limite de crédito: </strong>{element.limiteCredito}</p>
                                <p><strong>Crédito disponível: </strong>{element.creditoDisponivel}</p>
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