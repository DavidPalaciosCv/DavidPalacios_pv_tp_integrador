import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientePorId, modificarCliente } from '../services/clienteService';
import '../css/EditarCliente.css';
import { 
    Container, Paper, Typography, TextField,
    Button, Box, CircularProgress, Alert
 } from '@mui/material';

const EditarCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");

    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargaCliente = async () => {
            try{
                setCargando(true);
                
                const data = await getClientePorId(id);
                
                if(!data)throw new Error("El cliente  no existe");
                
                setCliente(data);

                setNombre(data.name?.firstname || "");
                setApellido(data.name?.lastname || "");
                setEmail(data.email || "");
            }catch (err) {
                setError(err.message);
            }finally{
                setCargando(false);
            }
        };
        cargaCliente();
    }, [id]);

    const handleGuardar = async (e) => {
        e.preventDefault();

        if(!nombre || !apellido ||  !email){
            setError("Todos los campos son obligatorios.");
            return;
        }

        try{
            setGuardando(true);
            setError(null);

            await modificarCliente(id, {
                name: {
                    firstname: nombre,
                    lastname: apellido
                },
                email: email
            });

            navigate(`/clientes/${id}`);
        }catch(err){
            setError(err.message);
        }finally{
            setGuardando(false);
        }
    };

    if(cargando){
        return(
            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >
                <CircularProgress />
            </Box>
        );
    }

    if(error &&  !cliente){
        return(
            <Container sx={{mt:4}}>
                <Alert severity='error'>
                    {error}
                </Alert>
            </Container>
        );
    }

    return(
        <Container maxWidth="md" sx={{mt:4, mb:4}}>
            <Button
                onClick={() => navigate(`/clientes/${id}`)}
                className='boton'
                >
                    - Volver a la ficha
                </Button>

                <Paper
                    sx={{
                        p:4, 
                        backgroundColor: "rgba(25, 25, 40, 0.95)",
                        color: "white"
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{mb:3}}
                    >
                        Modificar Cliente
                    </Typography>

                    {error && (
                        <Alert
                            severity='error'
                            sx={{mb:2}}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleGuardar}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            fullWidth
                            sx={{mb:2}}
                        />
                        <TextField
                            label="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            fullWidth
                            sx={{mb:2}}
                        />
                        <TextField
                            label="Email"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            sx={{mb:3}}
                        />
                        <Box display="flex" gap={2}>
                            <Button
                                type='submit'
                                className='boton'
                                disabled={guardando}
                            >
                                {guardando
                                    ?"Guardando..."
                                    :"Guardar Cambios"}
                            </Button>
                            <Button
                                className='boton'
                                onClick={() =>
                                    navigate(`/clientes/${id}`)
                                }
                            >
                                Cancelar
                            </Button>
                        </Box>                       
                    </form>
                </Paper>
        </Container>
    );
};

export default EditarCliente;
