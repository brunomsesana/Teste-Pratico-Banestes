import { Link } from "react-router-dom";
import { Cliente } from "../Interfaces/Interfaces";
import { useContext } from "react";
import AppContext from "../AppContext";

export default function ListClientes({list} : {list: Cliente[]}){
  const [ctxCliente, ctxId] = useContext(AppContext);
  const { setIdCliente } = ctxId;
  const handleProfile = (id: string) => {
    setIdCliente(id);
  }
  return list.length > 0 ? list.map((element, index) => {
    return(
      <div key={index} style={{backgroundColor: "#e3e3e3", borderRadius: "10px", border: "solid 2px black", padding: "10px", margin: "10px"}}>
        <div>
          <p>Nome: {element.nome}</p>
          <p>CPF/CNPJ: {element.cpfCnpj}</p>
          <p>Email: {element.email}</p>
        </div>
        <Link to={"/perfil"} onClick={() => handleProfile(element.id)}>Mostrar mais</Link>
      </div>
  );
  }) : <p>Carregando...</p>;
}