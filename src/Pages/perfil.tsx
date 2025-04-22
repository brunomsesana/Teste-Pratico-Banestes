import { useState, useContext, useEffect } from "react";
import { Agencia, Cliente } from "../Interfaces/Interfaces";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";
import styles from "./perfil.module.css";
import { Header } from "../Components";

/**
 * Página Perfil
 * -----------------
 * Exibe o perfil de um cliente, incluindo suas informações pessoais, agência associada,
 * e contas vinculadas, caso existam.
 * 
 * - Carrega os dados do cliente e da agência com base nos IDs fornecidos.
 * - Exibe informações detalhadas do cliente, como CPF, RG, renda, patrimônio e estado civil.
 * - Exibe informações da agência associada e as contas do cliente, se houver.
 * - Exibe mensagens de erro caso a agência ou contas não sejam encontradas.
 */
export function Perfil(){
    // Obtém dados de clientes, agências e IDs do contexto
    const [ctxCliente, ctxContas, ctxAgencias, ctxId] = useContext(AppContext);
    const { dadosClientes } = ctxCliente;
    const { dadosAgencias } = ctxAgencias;
    const { ids } = ctxId;
    const { contas } = ids;

    // Estado para armazenar as informações do cliente e da agência
    const [client, setClient] = useState<Cliente>();
    const [agency, setAgency] = useState<Agencia[]>([]);

    // Busca o cliente e a agência correspondente
    useEffect(() => {
        dadosClientes.forEach(element => {
            if (element.id == ids.cliente){
                setClient(element);
            }
        });
        setAgency(dadosAgencias.filter((x) => x.codigo.toString() == ids.agencia));
    }, []);

    return(
        <>
            <Header back="/"></Header>
            {client ? <>
                <div className={styles.infoCliente}>
                    {/* Exibe o nome do cliente (ou nome social se for o caso) */}
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

                {/* Exibe as informações da agência associada ao cliente */}
                <div className={styles.perfil}>
                    {
                        agency.length > 0 ? 
                        <Link className={styles.infoAgencia} to={"/agencia"}>
                            <h3>{agency[0].nome}</h3>
                            <p><strong>Código da agência: </strong>{agency[0].codigo}</p>
                            <p><strong>Endereço da agência: </strong>{agency[0].endereco}</p>
                        </Link>
                        :
                        // Caso a agência não seja encontrada, exibe uma mensagem de erro
                        <div className={styles.infoAgencia}>
                            <p><strong>Erro ao localizar agência de código: </strong>{client.codigoAgencia}</p>
                        </div>
                    }

                    {
                        // Se o cliente tiver contas associadas, exibe as informações de cada conta
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
                        // Se não houver contas, exibe uma mensagem indicando isso
                        <div className={styles.infoContas}>
                            <p>Este usuário não possui contas</p>
                        </div>
                    }
                </div>
            </> : 
            // Caso o cliente ainda não tenha sido carregado, exibe uma mensagem de "Carregando..."
            <p>Carregando...</p>}
        </>
    )
}
