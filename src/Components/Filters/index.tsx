import { useContext } from "react"
import AppContext from "../../AppContext"
import styles from "./Filters.module.css"

/**
 * Componente de filtros para busca de clientes por nome, CPF/CNPJ ou agência
 * ---------------------------------------------------------------------------
 * @param setListaFiltrada Define a lista filtrada a ser exibida
 * @param setListaAtual Atualiza a página atual da lista
 * @param setTamAtual Define o índice de início da lista exibida
 */
export default function Filters({setListaFiltrada, setListaAtual, setTamAtual}: {setListaFiltrada: Function, setListaAtual: Function, setTamAtual: Function}){

    // Acesso ao contexto global com dados de clientes e agências
    const [ctxCliente, , ctxAgencias] = useContext(AppContext);
    const { dadosClientes } = ctxCliente;
    const { dadosAgencias } = ctxAgencias;

    /**
     * Filtra a lista de clientes pelo nome informado
     * --------------------------------------------------
     * @param searchStr Texto a ser buscado
     */
    function handleFilterNome(searchStr: string){
        const resultado = searchStr !== "" ?
            dadosClientes.filter((x) => x.nome.toLowerCase().includes(searchStr.toLowerCase())) 
            : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }

    /**
     * Filtra a lista de clientes pelo CPF/CNPJ informado
     * --------------------------------------------------
     * @param searchStr Texto a ser buscado
     */
    function handleFilterCPF(searchStr: string){
        const resultado = searchStr !== "" ?
            dadosClientes.filter((x) => x.cpfCnpj.includes(searchStr)) 
            : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }

    /**
     * Filtra a lista de clientes pela agência selecionada
     * --------------------------------------------------
     * @param codAgencia Código da agência a ser buscada
     */
    function handleFilterAgencia(codAgencia: string){
        const resultado = codAgencia !== "" ?
            dadosClientes.filter((x) => x.codigoAgencia.toString() == codAgencia) 
            : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }

    // Estrutura com inputs para aplicar os filtros de nome, CPF/CNPJ e agência
    return(
        <div className={styles.filter}>
            <input 
                className={styles.input} 
                type="text" 
                placeholder='Nome' 
                onChange={(e) => {handleFilterNome(e.target.value)}} 
            />
            <input 
                className={styles.input} 
                type="number" 
                placeholder='CPF/CNPJ' 
                onChange={(e) => {handleFilterCPF(e.target.value)}} 
            />
            <select 
                className={styles.selectinput} 
                name="agencia" 
                id="agencia" 
                onChange={(e) => {handleFilterAgencia(e.target.value)}}
            >
                <option value="" selected>Todas as agências</option>
                {dadosAgencias.map((element) => (
                    <option key={element.id} value={element.codigo}>{element.nome}</option>
                ))}
            </select>
        </div>
    )
}
