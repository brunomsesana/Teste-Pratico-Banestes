import { Cliente } from "../../Interfaces/Interfaces";
import CardCliente from "../CardCliente";
import styles from "./ListClientes.module.css"
import { useMediaQuery } from "react-responsive";

/**
 * Componente responsável por exibir uma lista de clientes
 * --------------------------------------------------------
 * Adapta a visualização para versão desktop (tabela) ou mobile (cards empilhados), 
 * com base no tamanho da tela.
 * 
 * @param list Lista de clientes a ser exibida
 */
export default function ListClientes({list} : {list: Cliente[]}){
  // Detecta se o dispositivo está em uma tela pequena
  const isMobile = useMediaQuery({ maxWidth: 600 });

  // Renderiza a lista de clientes se houver itens na lista
  return list.length > 0 ? 
    !isMobile ? 
      // Modo desktop: exibe os clientes em uma tabela
      <table className={styles.table}>
        <thead className={styles.header}>
          <td>Nome</td>
          <td>CPF/CNPJ</td>
          <td>Email</td>
          <td></td>
        </thead>
        <tbody>
          {list.map((element, index) => (
            <CardCliente key={index} element={element} />
          ))}
        </tbody>
      </table>
    :
      // Modo mobile: exibe os clientes como cards empilhados
      list.map((element, index) => (
        <CardCliente key={index} element={element} />
      ))
  : 
    // Caso a lista esteja vazia (ou ainda carregando)
    <div className={styles.table}>
      <p>Carregando...</p>
    </div>
}
