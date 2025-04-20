import { useState, useContext, useEffect } from "react";
import { Agencia, Cliente } from "../Interfaces/Interfaces";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";
import styles from "./perfil.module.css";
import { Header } from "../Components";

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
            <Header back="/"></Header>
            {client ? <>
            <div className={styles.infoCliente}>
                <h1>{client.nomeSocial ? client.nomeSocial : client.nome}</h1>
                <p><strong>CPF: </strong>{client.cpfCnpj}</p>
                <p><strong>RG: </strong>{client.rg ? client.rg : "Não registrado"}</p>
                <p><strong>Data de Nascimento: </strong>{client.dataNascimento.toString()}</p>
                <p><strong>Email: </strong>{client.email}</p>
                <p><strong>Endereço: </strong>{client.endereco}</p>
                <p><strong>Renda: </strong>R${client.rendaAnual}/Ano</p>
                <p><strong>Patrimônio: </strong>R${client.patrimonio}</p>
                <p><strong>Estado Civil: </strong>{client.estadoCivil}</p>
            </div>
            <div className={styles.perfil}>
                {
                    agency.length > 0 ? 
                    <Link className={styles.infoAgencia} to={"/agencia"}>
                        <h3>{agency[0].nome}</h3>
                        <p><strong>Código da agência: </strong>{agency[0].codigo}</p>
                        <p><strong>Endereço da agência: </strong>{agency[0].endereco}</p>
                    </Link>
                    :
                    <div className={styles.infoAgencia}>
                        <p><strong>Erro ao localizar agência de código: </strong>{client.codigoAgencia}</p>
                    </div>
                }
                {
                    contas.length > 0 ? 
                    <div className={styles.infoContas}>
                        <h3>Contas</h3>
                        <div className={styles.containerContas}>
                            {contas.map((element) => (
                                <div className={styles.itemConta}>
                                    <p><strong>Tipo de conta: </strong>{element.tipo}</p>
                                    <p><strong>Saldo da conta: </strong>R${element.saldo}</p>
                                    <p><strong>Limite de crédito: </strong>R${element.limiteCredito}</p>
                                    <p><strong>Crédito disponível: </strong>R${element.creditoDisponivel}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className={styles.infoContas}>
                        <p>Este usuário não possui contas</p>
                    </div>
                }
                </div>
            </> : <p>Carregando...</p>}
        </>
    )
}