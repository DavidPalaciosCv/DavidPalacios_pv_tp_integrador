import { useState } from "react";
import "../../css/FormularioCliente.css";

import {
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";

const FormularioCliente = ({ onAddCliente }) => {

  const [modoAvanzado, setModoAvanzado] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    street: "",
    number: "",
    city: "",
    zipcode: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name = form.name.trim();
    const lastname = form.lastname.trim();
    const email = form.email.trim();


    if (!name || !lastname || !email) {
      setMensaje("Error: Nombre, Apellido y Email son obligatorios");
      setOpen(true);
      return;
    }


    if (!soloLetras.test(name)) {
      setMensaje("Error: El nombre solo puede contener letras");
      setOpen(true);
      return;
    }


    if (!soloLetras.test(lastname)) {
      setMensaje("Error: El apellido solo puede contener letras");
      setOpen(true);
      return;
    }


    if (!emailRegex.test(email)) {
      setMensaje("Error: Email inválido");
      setOpen(true);
      return;
    }

    try {

      const nuevoCliente = {
        name: {
          firstname: name,
          lastname: lastname
        },
        email: email
      };


      if (modoAvanzado) {
        nuevoCliente.phone = form.phone.trim() || undefined;
        nuevoCliente.username = form.username.trim() || undefined;
        nuevoCliente.password = form.password.trim() || undefined;
        nuevoCliente.address = {
          street: form.street.trim() || undefined,
          number: form.number.trim() ? Number(form.number.trim()) : undefined,
          city: form.city.trim() || undefined,
          zipcode: form.zipcode.trim() || undefined
        };
      }

      if (onAddCliente) {
        onAddCliente(nuevoCliente);
      }

      setMensaje("Cliente creado correctamente");
      setOpen(true);

      setForm({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        street: "",
        number: "",
        city: "",
        zipcode: ""
      });

    } catch (error) {
      console.error(error);
      setMensaje("Error al crear cliente");
      setOpen(true);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography variant="h5">
          Alta de Cliente
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Apellido"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />


          <div className="toggle-avanzado-container">
            <button
              type="button"
              className={`toggle-avanzado-btn ${modoAvanzado ? "activo" : ""}`}
              onClick={() => setModoAvanzado(!modoAvanzado)}
            >
              {modoAvanzado ? "▲ Ocultar campos avanzados" : "▼ Modo Avanzado"}
            </button>
          </div>


          {modoAvanzado && (
            <div className={`campos-avanzados ${modoAvanzado ? "visible" : ""}`}>

              <Typography variant="subtitle2" className="seccion-titulo">
                Contacto
              </Typography>

              <TextField
                label="Teléfono"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <Typography variant="subtitle2" className="seccion-titulo">
                Dirección
              </Typography>

              <div className="campos-fila">
                <TextField
                  label="Calle"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Número"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </div>

              <div className="campos-fila">
                <TextField
                  label="Ciudad"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Código Postal"
                  name="zipcode"
                  value={form.zipcode}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </div>

              <Typography variant="subtitle2" className="seccion-titulo">
                Credenciales
              </Typography>

              <div className="campos-fila">
                <TextField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </div>
            </div>
          )}

          <Button variant="contained" type="submit">
            Agregar Cliente
          </Button>

        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={mensaje.startsWith("Error") ? "error" : "success"}>
          {mensaje}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormularioCliente;