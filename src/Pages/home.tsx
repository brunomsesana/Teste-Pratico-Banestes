import {useState, useEffect, useContext} from 'react';
import {Cliente, Conta, Agencia} from "../Interfaces/Interfaces"
import { ListClientes } from '../Components';
import Papa from 'papaparse';
import AppContext from '../AppContext';

async function getData<T>(url : string) {
    try {
        const response = await fetch(url);
        if (!response.ok){
        throw new Error(`Response status: ${response.status}`)
        }
        let result = Papa.parse<T>(await response.text(), {
        header: true,
        skipEmptyLines: true
        }).data;
        return result
    } catch (error : any) {
        console.error("Erro ao obter dados: ", error);
        return [];
    }
}

export function Home(){
    const [listaAtual, setListaAtual] = useState<Cliente[]>([]);
    const [tamAtual, setTamAtual] = useState(0);
    const [ctxCliente, ctxContas, ctxAgencias] = useContext(AppContext);
    const {dadosClientes, setDadosClientes} = ctxCliente;
    const [listaFiltrada, setListaFiltrada] = useState<Cliente[]>([]);
    const {setDadosContas} = ctxContas;
    const {dadosAgencias, setDadosAgencias} = ctxAgencias;

    
    useEffect(() => {
        getData<Cliente>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes").then((result) => {
        setDadosClientes(result);
        setListaFiltrada(result);
        setListaAtual(result.slice(0, 10));
        })
        getData<Agencia>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias").then((result) => {
        setDadosAgencias(result);
        })
        getData<Conta>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas").then((result) => {
        setDadosContas(result);
        })
    }, [])
    function handleNext(){
        setListaAtual(listaFiltrada.slice(tamAtual + 10, tamAtual + 20));
        setTamAtual(tamAtual + 10);
    }
    function handlePrev(){
        setListaAtual(listaFiltrada.slice(tamAtual - 10, tamAtual));
        setTamAtual(tamAtual - 10);
    }
    function handleFilterNome(searchStr: string){
        const resultado = searchStr !== "" ?
        dadosClientes.filter((x) => x.nome.toLowerCase().includes(searchStr.toLowerCase())) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    function handleFilterCPF(searchStr: string){
        const resultado = searchStr !== "" ?
        dadosClientes.filter((x) => x.cpfCnpj.includes(searchStr)) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    function handleFilterAgencia(codAgencia: string){
        const resultado = codAgencia !== "" ?
        dadosClientes.filter((x) => x.codigoAgencia.toString() == codAgencia) : dadosClientes;
        setListaFiltrada(resultado);
        setListaAtual(resultado.slice(0, 10 < resultado.length ? 10 : resultado.length));
        setTamAtual(0);
    }
    return (
        <>
            <div>
                <input type="text" placeholder='Nome' onChange={(e) => {handleFilterNome(e.target.value)}} />
                <input type="number" placeholder='CPF/CNPJ' onChange={(e) => {handleFilterCPF(e.target.value)}} />
                <select name="agencia" id="agencia" onChange={(e) => {handleFilterAgencia(e.target.value)}}>
                    <option value="" selected>Agência</option>
                    {dadosAgencias.map((element) => (
                        <option key={element.id} value={element.codigo}>{element.nome}</option>
                    ))}
                </select>
            </div>
            <ListClientes list={listaAtual}></ListClientes>
            <button onClick={handlePrev} disabled={tamAtual - 10 >= 0 ? false : true}>Prev.</button>
            <button onClick={handleNext} disabled={tamAtual + 10 < listaFiltrada.length - 1 ? false : true}>Next</button>
        </>
    )
}