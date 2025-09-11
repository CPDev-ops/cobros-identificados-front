import { type FC } from 'react';
import { useAuth } from '../hook/useAuth';
import { toast } from 'react-toastify';

interface LogoutButtonProps {
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger';
}

const LogoutButton: FC<LogoutButtonProps> = ({
    className = '',
    variant = 'danger'
}) => {
    const { logout, isLoggingOut } = useAuth();

    const handleLogout = async () => {
        const result = await logout();
        console.log(result)
        if (result) {
            // Aquí puedes manejar el caso de éxito si es necesario
            toast.success('Sesión cerrada correctamente');
        }
        /*  if (!result?.success) {
             console.log('Error al cerrar sesión. Inténtalo de nuevo.');
         } */

    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 hover:bg-blue-700 text-white';
            case 'secondary':
                return 'bg-gray-600 hover:bg-gray-700 text-white';
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white';
            default:
                return 'bg-red-600 hover:bg-red-700 text-white';
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
        px-4 py-2 rounded-lg font-medium transition-colors duration-200
        ${getVariantClasses()}
        ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        ${className}
      `}
        >
            {isLoggingOut ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Cerrando sesión...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Cerrar Sesión
                </span>
            )}
        </button>
    );
};

export default LogoutButton;
