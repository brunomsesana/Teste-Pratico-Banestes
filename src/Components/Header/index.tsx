import logo_azul from "../../Assets/logo_banestes_azul.svg"
import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import seta from "../../Assets/Seta.svg"

export default function Header({back} : {back?: string}){
    return(
        <div className={styles.bar}>
            {back ? <Link to={back}><img src={seta} alt="" className="setaEsquerda" style={{position: "absolute", left: 5, top: 20, width: 70}}/></Link> : ""}
            <img src={logo_azul} alt="Banestes" className={styles.logo} />
        </div>
    )
}