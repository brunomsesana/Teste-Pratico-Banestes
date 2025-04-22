import { useState, useEffect, useContext } from 'react';
import { Cliente, Conta, Agencia } from "../Interfaces/Interfaces"
import { ListClientes, Filters, Header } from '../Components';
import AppContext from '../AppContext';
import getData from '../getData';
import seta from "../Assets/Seta.svg"

/**
 * Página Home
 * -----------------
 * Responsável por exibir a lista de clientes com filtros, navegação de páginas e renderização
 * dos dados das contas e agências associadas ao cliente.
 * 
 * - Carrega dados de clientes, contas e agências da planilha
 * - Implementa navegação entre páginas (próxima/previa) da lista de clientes
 */
export function Home(){
    // Estado para armazenar a lista atual de clientes visível na página
    const [listaAtual, setListaAtual] = useState<Cliente[]>([]);
    // Estado para controlar a posição da página atual (índice)
    const [tamAtual, setTamAtual] = useState(0);
    // Estado para armazenar a lista que está sendo filtrada no momento
    const [listaFiltrada, setListaFiltrada] = useState<Cliente[]>([]);
    
    // Obtém funções e dados do contexto
    const [ctxCliente, ctxContas, ctxAgencias] = useContext(AppContext);
    const {setDadosClientes} = ctxCliente;
    const {setDadosContas} = ctxContas;
    const {setDadosAgencias} = ctxAgencias;

    // Efeito para carregar os dados de clientes, contas e agências
    useEffect(() => {
        // Carrega os dados dos clientes
        getData<Cliente>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes").then((result) => {
            setDadosClientes(result);
            setListaFiltrada(result);
            setListaAtual(result.slice(0, 10)); // Exibe os 10 primeiros clientes ao carregar
        });
        // Carrega os dados das agências
        getData<Agencia>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias").then((result) => {
            setDadosAgencias(result);
        });
        // Carrega os dados das contas
        getData<Conta>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas").then((result) => {
            setDadosContas(result);
        });
    }, []);

    // Função para exibir a próxima página da lista de clientes
    function handleNext(){
        setListaAtual(listaFiltrada.slice(tamAtual + 10, tamAtual + 20));
        setTamAtual(tamAtual + 10);
    }

    // Função para exibir a página anterior da lista de clientes
    function handlePrev(){
        setListaAtual(listaFiltrada.slice(tamAtual - 10, tamAtual));
        setTamAtual(tamAtual - 10);
    }

    return (
        <div className='container'>
            <Header/>
            
            {/* Controles de navegação entre páginas */}
            <div className='containerPrevNext'>
                <button className='btn' onClick={handlePrev} disabled={tamAtual - 10 >= 0 ? false : true}>
                    <img src={seta} className='seta setaEsquerda'></img>
                </button>

                {/* Filtros para pesquisa */}
                <Filters setListaFiltrada={setListaFiltrada} setListaAtual={setListaAtual} setTamAtual={setTamAtual} />

                <button className='btn' onClick={handleNext} disabled={tamAtual + 10 < listaFiltrada.length - 1 ? false : true}>
                    <img src={seta} className='seta setaDireita'></img>
                </button>
            </div>
            
            <ListClientes list={listaAtual}></ListClientes>

            <div className='containerPrevNext'>
                <button className='btn' onClick={handlePrev} disabled={tamAtual - 10 >= 0 ? false : true}>
                    <img src={seta} className='seta setaEsquerda'></img>
                </button>
                {/*Indicação da página atual*/}
                <div className='baloon'>
                    <p>{Math.floor((tamAtual + 10) / 10)} / {Math.floor(listaFiltrada.length / 10)}</p>
                </div>
                <button className='btn' onClick={handleNext} disabled={tamAtual + 10 < listaFiltrada.length - 1 ? false : true}>
                    <img src={seta} className='seta setaDireita'></img>
                </button>
            </div>
        </div>
    )
}
