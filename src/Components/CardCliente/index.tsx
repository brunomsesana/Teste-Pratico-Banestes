import { Cliente, Conta } from "../../Interfaces/Interfaces"
import { Link } from "react-router-dom"
import { useContext } from "react";
import AppContext from "../../AppContext";
import styles from "./CardCliente.module.css"

export default function CardCliente({element} : {element: Cliente}){
    const [ctxCliente, ctxContas, ctxAgencias, ctxId] = useContext(AppContext);
    const { dadosContas } = ctxContas;
    const { setIds } = ctxId;
    const handleProfile = (ids: {cliente: string, contas: Conta[], agencia: string}) => {
        setIds(ids);
    }
    return(
        <tr className={styles.card}>
            <td>
                <p>{element.nomeSocial ? element.nomeSocial : element.nome}</p>
            </td>
            <td>
                <p>{element.cpfCnpj}</p>
            </td>
            <td>
                <p>{element.email}</p>
            </td>
            <td>
                <Link to={"/perfil"} onClick={() => handleProfile({cliente: element.id, contas: dadosContas.filter((x) => x.cpfCnpjCliente == element.cpfCnpj), agencia: element.codigoAgencia.toString()})}>Mostrar mais</Link>
            </td>
        </tr>
    )
}