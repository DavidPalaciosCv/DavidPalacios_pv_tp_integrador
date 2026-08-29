import { createContext, useState, useEffect } from 'react';
import { autorizacionesService } from '../services/autorizacionesService';

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  
  const [admin, setAdmin] = useState(() => {
    const sesionGuardada = localStorage.getItem('admin_session');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin_session', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin_session');
    }
  }, [admin]);

  const login = async (nombre, password, sector) => {
    const res = await autorizacionesService.login(nombre, password, sector);
    if (res.exito) {
      setAdmin(res.datos);
    }
    return res;
  };

  const logout = () => {
    setAdmin(null); 
  };
  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};