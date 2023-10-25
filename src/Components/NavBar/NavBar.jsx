import styles from "./NavBar.module.css";
import NavBarLink from "./NavBarLink/NavbarLink";
import logo from "../../imagenes/logo.png";

function NavBar() {
  return (
    <div className={styles.NavBar}>
      <aside className={styles.AsideNavBar}>
        <div className={styles.NavBarlogo}>
          <img className={styles.logo} src={logo} alt="" />
        </div>
        <NavBarLink to={"/"}>
          <span>HOME</span>
        </NavBarLink>

        <div>
          <input
            className={styles.AsideNavBarInput}
            name="text"
            type="text"
            placeholder="Search the internet..."
          />
        </div>

        <NavBarLink to={"/Carrito"}>
          <span>CARRITO</span>
        </NavBarLink>

        <NavBarLink to={"/Registrarse"}>
          <span>REGISTRARSE</span>
        </NavBarLink>

        <NavBarLink to={"/Inventario"}>
          <span>INVENTARIO</span>
        </NavBarLink>
      </aside>
    </div>
  );
}

export default NavBar;
