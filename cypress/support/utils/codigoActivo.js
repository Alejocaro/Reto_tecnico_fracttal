class CodigoActivo {
    static generateRandomNumber(length) {
        const numbers = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return result;
      }
}

export const codigoActivo = {
    get numero_activo() {
        // Verificar si ya existe un código en localStorage
        let codigo = localStorage.getItem('codigo_activo_test');
        
        // Si no existe, generar uno nuevo y guardarlo
        if (!codigo) {
            codigo = CodigoActivo.generateRandomNumber(4);
            localStorage.setItem('codigo_activo_test', codigo);
        }
        
        return codigo;
    },
    
    // Método para limpiar el código guardado (útil para nuevos tests)
    limpiarCodigo() {
        localStorage.removeItem('codigo_activo_test');
    }
}