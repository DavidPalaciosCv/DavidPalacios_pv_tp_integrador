import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin.js'; 
import '../css/DetalleCliente.css';
import { 
    Container, Paper, Typography, Box, Grid, Button, 
    CircularProgress, Alert, Divider, Snackbar 
} from '@mui/material';
import { eliminarCliente , getClientePorId  } from "../services/clienteService";

const DetalleCliente = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { admin } = useAdmin(); 

    const [cliente, setCliente] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [eliminando, setEliminando] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {

    const cargarCliente = async () => {

        try {

            setCargando(true);
            setError(null);

            const data = await getClientePorId(id);

            if (!data) {
                throw new Error("El cliente solicitado no existe.");
            }

            setCliente(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setCargando(false);

        }

    };

    if (id) {
        cargarCliente();
    }

}, [id]);

    const handleEliminarCliente = async () => {

    if (!window.confirm("¿Seguro que quiere eliminar al cliente?")) return;

    try {

        setEliminando(true);

        await eliminarCliente(id);

        setOpenSnackbar(true);

        setTimeout(() => {

            navigate("/clientes");

        }, 1500);

    } catch (err) {

        alert(err.message);

    } finally {

        setEliminando(false);

    }

};

    if (cargando) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress color="secondary" /></Box>;
    if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Button onClick={() => navigate('/clientes')} sx={{ color: '#b388ff', mb: 2, textTransform: 'none' }}>
                ← Volver a Clientes
            </Button>

            <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(25, 25, 40, 0.95)', color: 'white', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                    <Box>
                        <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
                            {cliente?.name?.firstname} {cliente?.name?.lastname}
                        </Typography>
                        <Typography variant="subtitle2" color="#b388ff">ID Registro: #{id}</Typography>
                    </Box>

                    {admin?.sector === 'Gerencia' ? (
                        <Button 
                            variant="contained" 
                            color="error" 
                            disabled={eliminando} 
                            onClick={handleEliminarCliente}
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            {eliminando ? 'Eliminando' : 'Eliminar Cliente'}
                        </Button>
                    ) : (
                        <Typography variant="caption" sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                            Sector: {admin?.sector} (Solo Lectura)
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="#b388ff">Contacto</Typography>
                        <Typography><strong>Email:</strong> {cliente?.email}</Typography>
                        <Typography><strong>Teléfono:</strong> {cliente?.phone}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="#b388ff">Dirección Completa</Typography>
                        <Typography><strong>Calle:</strong> {cliente?.address?.street} N° {cliente?.address?.number}</Typography>
                        <Typography><strong>Ciudad:</strong> {cliente?.address?.city}</Typography>
                        <Typography><strong>C.P.:</strong> {cliente?.address?.zipcode}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.1)' }}>
                            <Typography variant="subtitle1" color="#00e676">Credenciales de Acceso (BD)</Typography>
                            <Typography><strong>Username:</strong> {cliente?.username}</Typography>
                            <Typography><strong>Password:</strong> {cliente?.password}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar open={openSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="warning" variant="filled">Petición DELETE procesada. Redirigiendo...</Alert>
            </Snackbar>
        </Container>
    );
}

export default DetalleCliente;