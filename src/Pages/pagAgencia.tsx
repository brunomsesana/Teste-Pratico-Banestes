import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { Agencia } from "../Interfaces/Interfaces";
import { ListClientes } from "../Components";
import { Link } from "react-router-dom";

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
            <Link to='/perfil'>Voltar</Link>
            {agency ? 
            <div>
                <div>
                    <p>Nome: {agency.nome}</p>
                    <p>Código da agência: {agency.codigo}</p>
                    <p>Endereço: {agency.endereco}</p>
                </div>
                <div>
                    <p>Clientes:</p>
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