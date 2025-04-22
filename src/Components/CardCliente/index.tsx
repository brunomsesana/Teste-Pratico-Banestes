import { Cliente, Conta } from "../../Interfaces/Interfaces"
import { Link } from "react-router-dom"
import { useContext } from "react";
import AppContext from "../../AppContext";
import styles from "./CardCliente.module.css"
import { useMediaQuery } from "react-responsive";

/**
 * Gera a estrutura de exibição do cliente na lista dependendo do tamanho da tela
 * -------------------------------------
 * @param element Cliente sendo inserido
 * @returns 
 */
export default function CardCliente({element} : {element: Cliente}){
    // Obtém dados e funções do contexto
    const [ctxCliente, ctxContas, ctxAgencias, ctxId] = useContext(AppContext);
    const { dadosContas } = ctxContas;
    const { setIds } = ctxId;

    // Verifica se a visualização está em uma tela pequena (mobile)
    const isMobile = useMediaQuery({ maxWidth: 600 });

    /** Atualiza o contexto com os dados do cliente recebido
     * -------------------------
     * @param ids {cliente: (Id do cliente que está sendo acessado), contas: (Contas do usuário sendo acessado), agencia: (Código da agência ligada ao usuário sendo acessado)}*/ 
    const handleProfile = (ids: {cliente: string, contas: Conta[], agencia: string}) => {
        setIds(ids);
    }
    // Renderiza dois layouts diferentes dependendo do tamanho da tela: um com <tr> (tabela) para desktop e um com <div> para mobile
    return(
        !isMobile ?
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
            </tr> :
            <div className={styles.cell}>
                <div>
                    <p><strong>Nome: </strong>{element.nomeSocial ? element.nomeSocial : element.nome}</p>
                    <p><strong>CPF/CNPJ: </strong>{element.cpfCnpj}</p>
                    <p><strong>Email: </strong>{element.email}</p>
                </div>
                <Link to={"/perfil"} onClick={() => handleProfile({cliente: element.id, contas: dadosContas.filter((x) => x.cpfCnpjCliente == element.cpfCnpj), agencia: element.codigoAgencia.toString()})}>Mostrar mais</Link>
            </div>
    )
}