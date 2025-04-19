import logo_azul from "../../Assets/logo_banestes_azul.svg"
import styles from "./Header.module.css"

export default function Header(){
    return(
        <div className={styles.bar}>
            <img src={logo_azul} alt="Banestes" className={styles.logo} />
        </div>
    )
}