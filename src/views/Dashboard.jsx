import { useNavigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin.js';
import '../css/Dashboard.css'

const Dashboard = () => {
    const { admin } = useAdmin();
    const navigate = useNavigate();

    return (
        <div id="dashboard-container">
            <div id="dashboard-hero">
                <p className="dash-label">PANEL DE CONTROL</p>
                <h1 id="titulo">Bienvenido, <span className="dash-name">{admin?.nombre}</span></h1>
                <p className="dash-sub">Sector: <span className={`dash-sector ${admin?.sector === 'Gerencia' ? 'sector-gerencia' : 'sector-soporte'}`}>{admin?.sector}</span></p>
            </div>

            <div className="dash-cards">
                <div className="dash-card">
                    <span className="dash-card-icon">👥</span>
                    <h3>Gestión de Clientes</h3>
                    <p>Visualizá, buscá y gestioná toda la cartera de clientes registrados.</p>
                    <button className="dash-card-btn" onClick={() => navigate('/clientes')}>Ver Clientes →</button>
                </div>

                <div className="dash-card dash-card--alt">
                    <span className="dash-card-icon">🔐</span>
                    <h3>Tu Perfil</h3>
                    <p>Sesión activa en el sistema con permisos de <strong>{admin?.sector}</strong>.</p>
                    <div className="dash-status">
                        <span className="status-dot"></span> Conectado
                    </div>
                </div>

                <div className="dash-card">
                    <span className="dash-card-icon">📡</span>
                    <h3>API Externa</h3>
                    <p>Conectado a FakeStore API. Datos en tiempo real disponibles.</p>
                    <div className="dash-status">
                        <span className="status-dot status-dot--green"></span> Online
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;