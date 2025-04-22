import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { Agencia } from "../Interfaces/Interfaces";
import { ListClientes } from "../Components";
import { Header } from "../Components";
import styles from "./pagAgencia.module.css"

/**
 * Página Agência
 * ---------------------
 * Exibe informações detalhadas sobre uma agência específica, incluindo nome, código, 
 * endereço e a lista de clientes associados a essa agência.
 * 
 * - Carrega os dados da agência a partir do contexto e filtra com base no ID da agência.
 * - Exibe informações da agência e lista de clientes associados.
 * - Exibe uma mensagem de erro caso a agência não seja encontrada.
 */
export default function PagAgencia(){
    // Obtém dados de clientes, contas, agências e IDs do contexto
    const [ctxCliente, , ctxAgencias, ctxIds] = useContext(AppContext);
    const {dadosAgencias} = ctxAgencias;
    const {dadosClientes} = ctxCliente;
    const {ids} = ctxIds;

    // Estado para armazenar os dados da agência selecionada
    const [agency, setAgency] = useState<Agencia>();

    // Busca a agência com o código correspondente ao ID da agência fornecido
    useEffect(() => {
        let agencia = dadosAgencias.filter((x) => x.codigo.toString() == ids.agencia);
        if (agencia.length > 0) {
            setAgency(agencia[0]);
        }
    }, []);

    return (
        <>
            <Header back="/perfil"></Header>

            {agency ? 
            <div className={styles.agencia}>
                <div className={styles.infoAgencia}>
                    <h1>{agency.nome}</h1>
                    <p><strong>Código da agência: </strong>{agency.codigo}</p>
                    <p><strong>Endereço: </strong>{agency.endereco}</p>
                </div>

                {/* Exibe a lista de clientes associados à agência */}
                <div className={styles.infoClientes}>
                    <h3>Clientes:</h3>
                    <ListClientes list={dadosClientes.filter((element) => element.codigoAgencia == agency.codigo)}></ListClientes>
                </div>
            </div>
            
            : 
            // Caso a agência não seja encontrada, exibe uma mensagem de erro
            <div>
                <p>Agência não encontrada</p>
            </div>}
        </>
    );
}
