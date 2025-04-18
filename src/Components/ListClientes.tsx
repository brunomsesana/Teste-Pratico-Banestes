import { Link } from "react-router-dom";
import { Cliente } from "../Interfaces/Interfaces";
import { useContext } from "react";
import AppContext from "../AppContext";
import { Conta } from "../Interfaces/Interfaces";

export default function ListClientes({list} : {list: Cliente[]}){
  const [ctxCliente, ctxContas, ctxAgencias, ctxId] = useContext(AppContext);
  const {dadosContas} = ctxContas;
  const { setIds } = ctxId;
  const handleProfile = (ids: {cliente: string, contas: Conta[], agencia: string}) => {
    setIds(ids);
  }
  return list.length > 0 ? list.map((element, index) => {
    return(
      <div key={index} style={{backgroundColor: "#e3e3e3", borderRadius: "10px", border: "solid 2px black", padding: "10px", margin: "10px"}}>
        <div>
          <p><strong>Nome: </strong>{element.nomeSocial ? element.nomeSocial : element.nome}</p>
          <p><strong>CPF/CNPJ: </strong>{element.cpfCnpj}</p>
          <p><strong>Email: </strong>{element.email}</p>
        </div>
        <Link to={"/perfil"} onClick={() => handleProfile({cliente: element.id, contas: dadosContas.filter((x) => x.cpfCnpjCliente == element.cpfCnpj), agencia: element.codigoAgencia.toString()})}>Mostrar mais</Link>
      </div>
  );
  }) : <p>Carregando...</p>;
}