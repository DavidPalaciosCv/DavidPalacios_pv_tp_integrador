import { createBrowserRouter } from 'react-router-dom';
import RutaProtegida from '../components/common/RutaProtegida.jsx';
import Login from '../views/Login.jsx';
import Dashboard from '../views/Dashboard.jsx';
import DetalleCliente from '../views/DetalleCliente.jsx'
import Clientes from '../views/ListaClientes.jsx';
import Notfound from '../views/Notfound.jsx';
import App from '../App.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <RutaProtegida><Dashboard /></RutaProtegida>
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'dashboard',
                element: <RutaProtegida><Dashboard /></RutaProtegida>
            },
            {
                path: 'clientes',
                element: <RutaProtegida><Clientes /></RutaProtegida>
            },
            {
                path: 'clientes/:id',
                element: <RutaProtegida><DetalleCliente /></RutaProtegida>
            },
            {
                path: '*',
                element: <Notfound />
            }
        ]
    }
]);

export default router;