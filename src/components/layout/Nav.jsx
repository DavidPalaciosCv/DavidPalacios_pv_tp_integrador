import { NavLink } from "react-router-dom";
import '../../css/Nav.css' 

const Nav = () => {
    return (
        <nav>
            <ul id="navbar">
                <li>
                    <NavLink to="/dashboard" >Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/clientes" >Clientes</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;