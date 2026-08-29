import '../../css/Footer.css'

const Footer = () => {
    return (
        <footer id="footer-cyber">
            <div className="footer-line"></div>
            <div className="footer-content">
                <p className="footer-brand">⚡ SISTEMA DE GESTIÓN <span>v1.0</span></p>
                <p className="footer-info">Programación Visual · Grupo 4 · {new Date().getFullYear()}</p>
                <p className="footer-copy">Facultad de Ingeniería · Analista Programador Universitario</p>
            </div>
        </footer>
    );
}

export default Footer;