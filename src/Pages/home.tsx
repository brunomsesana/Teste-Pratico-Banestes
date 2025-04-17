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
    const [dadosContas, setDadosContas] = useState<Conta[]>([]);
    const [dadosAgencias, setDadosAgencias] = useState<Agencia[]>([]);
    const [ctxCliente, ctxId] = useContext(AppContext);
    const {dados, setDados} = ctxCliente;
    
    useEffect(() => {
        getData<Cliente>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes").then((result) => {
        setDados(result);
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
        setListaAtual(dados.slice(tamAtual + 10, tamAtual + 20));
        setTamAtual(tamAtual + 10);
    }
    function handlePrev(){
        setListaAtual(dados.slice(tamAtual - 10, tamAtual));
        setTamAtual(tamAtual - 10);
    }
    return (
        <>
        <ListClientes list={listaAtual}></ListClientes>
        <button onClick={handlePrev} disabled={tamAtual - 10 >= 0 ? false : true}>Prev.</button>
        <button onClick={handleNext} disabled={tamAtual + 10 < dados.length - 1 ? false : true}>Next</button>
        </>
    )
}