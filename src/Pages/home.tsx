import { useState, useEffect, useContext } from 'react';
import { Cliente, Conta, Agencia } from "../Interfaces/Interfaces"
import { ListClientes, Filters, Header } from '../Components';
import AppContext from '../AppContext';
import getData from '../getData';

export function Home(){
    const [listaAtual, setListaAtual] = useState<Cliente[]>([]);
    const [tamAtual, setTamAtual] = useState(0);
    const [ctxCliente, ctxContas, ctxAgencias] = useContext(AppContext);
    const {setDadosClientes} = ctxCliente;
    const [listaFiltrada, setListaFiltrada] = useState<Cliente[]>([]);
    const {setDadosContas} = ctxContas;
    const {setDadosAgencias} = ctxAgencias;

    
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
    return (
        <>
            <Header></Header>
            <Filters setListaFiltrada={setListaFiltrada} setListaAtual={setListaAtual} setTamAtual={setTamAtual}></Filters>
            <ListClientes list={listaAtual}></ListClientes>
            <button onClick={handlePrev} disabled={tamAtual - 10 >= 0 ? false : true}>Prev.</button>
            <button onClick={handleNext} disabled={tamAtual + 10 < listaFiltrada.length - 1 ? false : true}>Next</button>
        </>
    )
}