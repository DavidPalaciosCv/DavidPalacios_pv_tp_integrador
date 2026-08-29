import { MenuItem, TextField, Button, Typography } from "@mui/material"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import useAdmin from '../hooks/useAdmin.js'
import '../css/Login.css'
const Login = () => {

    const [nombre, setnombre] = useState("");
    const [password, setpassword] = useState("");
    const [sector, setsector] = useState("Seleccionar");
    const [error, setError] = useState("");

    const {login} = useAdmin();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if(!nombre || !password || !sector || sector === "Seleccionar") {
            setError("Debe completar todos los campos y seleccionar un sector válido");
            return;
        }

        const res = await login(nombre, password, sector);
        if (res.exito) {
            navigate("/dashboard");
        } else {
            setError(res.mensaje);
        }
    };

    return (
        <div id="logincontainer">
            
            <form onSubmit={handleSubmit} > 
                    <Typography variant="h4" id="titulologin">
                        Login
                    </Typography>
                    
                    {error && (
                        <Typography color="error" sx={{ mb: 2, fontFamily: 'Asimovian, sans-serif' }}>
                            {error}
                        </Typography>
                    )}

                    <TextField 
                        className="login-cyber-input"
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                        fullWidth
                    />
                    <TextField 
                        className="login-cyber-input"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        fullWidth
                    />
                    <TextField 
                        className="login-cyber-input"
                        select
                        label="Sector"
                        value={sector}
                        onChange={(e) => setsector(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="Seleccionar" disabled>Seleccionar</MenuItem>
                        <MenuItem value="Soporte">Soporte</MenuItem>
                        <MenuItem value="Gerencia">Gerencia</MenuItem>
                    </TextField>
                    <Button id="botonlogin" type="submit" variant="contained" sx={{mt:2}} >Ingresar</Button>
            </form>
        </div>
    );
}

export default Login;