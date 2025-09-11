import { useState } from 'react';
import { API_URL } from '../../service/connection';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate()
    const logout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
            });
            console.log(response)

            if (response.ok) {
                console.log('Logout exitoso:');
                // Aquí puedes agregar lógica adicional como:
                // - Limpiar localStorage
                // - Redireccionar a login
                // - Actualizar estado global
                navigate('/auth/login');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error en logout:', error);
            return { success: false, message: 'Error al cerrar sesión' };
        } finally {
            setIsLoggingOut(false);
        }
    };

    return {
        logout,
        isLoggingOut
    };
};
