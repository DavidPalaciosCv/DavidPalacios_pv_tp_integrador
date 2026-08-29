import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useAdmin from '../../hooks/useAdmin.js'
import '../../css/Header.css'

const Header = () => {

    const {admin, logout} = useAdmin();
    const navigate =useNavigate();
    const cerrarsesion = () => {
        logout();
        navigate("/login");
    }

    return(
        <header>
            <div className="header-info-cyber">
                <span className="header-user">
                    <span className="header-label">USUARIO:</span> {admin.nombre}
                </span>
                <span className={`header-badge ${admin.sector === 'Gerencia' ? 'badge-gerencia' : 'badge-soporte'}`}>
                    {admin.sector}
                </span>
            </div>
            <Button id="btncerrar" onClick={cerrarsesion}>Cerrar Sesión</Button>
        </header>
    );
}

export default Header;