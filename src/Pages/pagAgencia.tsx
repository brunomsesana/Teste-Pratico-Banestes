import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { Agencia } from "../Interfaces/Interfaces";
import { ListClientes } from "../Components";
import { Header } from "../Components";
import styles from "./pagAgencia.module.css"

export default function PagAgencia(){
    const [ctxCliente, ctxContas, ctxAgencias, ctxIds] = useContext(AppContext);
    const {dadosAgencias} = ctxAgencias;
    const {dadosClientes} = ctxCliente;
    const {ids} = ctxIds;
    const [agency, setAgency] = useState<Agencia>();
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
                <div className={styles.infoClientes}>
                    <h3>Clientes:</h3>
                    <ListClientes list={dadosClientes.filter((element) => element.codigoAgencia == agency.codigo)}></ListClientes>
                </div>
            </div>
            
            : 
            <div>
                <p>Agencia não encontrada</p>
            </div>}
        </>
    );
}