import logo_azul from "../../Assets/logo_banestes_azul.svg"
import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import seta from "../../Assets/Seta.svg"

/**
 * Componente de cabeçalho da aplicação
 * ------------------------------------
 * Exibe o logo do Banestes e, caso a prop `back` seja fornecida, exibe também uma seta de voltar com link.
 * 
 * @param back (opcional) Caminho para onde o botão de voltar deve redirecionar
 */
export default function Header({back} : {back?: string}){
    return(
        <div className={styles.bar}>
            {/* Se a prop 'back' existir, exibe o botão de voltar */}
            {back ? (
                <Link to={back}>
                    <img 
                        src={seta} 
                        alt="" 
                        className="setaEsquerda" 
                        style={{position: "absolute", left: 5, top: 20, width: 70}} 
                    />
                </Link>
            ) : ""}
            <img src={logo_azul} alt="Banestes" className={styles.logo} />
        </div>
    )
}
