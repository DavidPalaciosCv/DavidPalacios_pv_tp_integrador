export const autorizacionesService = {
  login: async (nombre, password, sector) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usuariosValidos = {
          Gerencia: { nombre: "gerente", password: "1234" },
          Soporte: { nombre: "soporte", password: "1234" },
        };

        const perfilCorrecto = usuariosValidos[sector];

        if (
          perfilCorrecto &&
          perfilCorrecto.nombre === nombre &&
          perfilCorrecto.password === password
        ) {
          resolve({
            exito: true,
            datos: { nombre, sector },
          });
        } else {
          resolve({
            exito: false,
            mensaje: "Contraseña Incorrecta o Credenciales Inválidas",
          });
        }
      }, 800);
    });
  },
};
