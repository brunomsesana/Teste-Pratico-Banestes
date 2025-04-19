import { Cliente } from "../../Interfaces/Interfaces";
import CardCliente from "../CardCliente";
import styles from "./ListClientes.module.css"

export default function ListClientes({list} : {list: Cliente[]}){
  return list.length > 0 ? 
    <table className={styles.table}>
      <tr className={styles.header}>
        <td>Nome</td>
        <td>CPF/CNPJ</td>
        <td>Email</td>
        <td></td>
      </tr>
        {list.map((element, index) => {
          return(
            <CardCliente key={index} element={element}></CardCliente>
          )})}
    </table>
   : 
    <div className={styles.table}>
      <p>Carregando...</p>;
    </div>
}