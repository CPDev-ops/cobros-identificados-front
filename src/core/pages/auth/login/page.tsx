import { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { API_URL } from '../../../../service/connection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
    username: string;
    password: string;
}

interface FormErrors {
    username?: string;
    password?: string;
}

export const LoginPage = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error cuando el usuario empieza a escribir
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'El usuario es requerido';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Crear FormData en lugar de JSON
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('password', formData.password);

            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                // NO incluir Content-Type, el navegador lo configurará automáticamente para FormData
                body: formDataToSend
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Login exitoso - redirigir o actualizar estado
                console.log('Login exitoso:', data.message);
                // Aquí puedes redirigir o actualizar el estado global
                /* window.location.href = '/home'; */
                toast.success(data.message || 'Login exitoso');
                navigate('/home');
            } else {
                // Error de credenciales
                setErrors({
                    password: data.message || 'Credenciales incorrectas'
                });
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setErrors({
                password: 'Error de conexión. Intenta nuevamente.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #dc3545 0%, transparent 50%)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            {/* Login Container */}
            <div className="relative w-full max-w-md mx-4">
                <div
                    className="rounded-2xl shadow-2xl p-8 border"
                    style={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e9ecef'
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: '#dc3545' }}
                        >
                            <FiUser size={32} color="#ffffff" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#212529' }}>
                            Iniciar Sesión
                        </h1>
                        <p className="text-sm" style={{ color: '#6c757d' }}>
                            Ingresa tus credenciales para continuar
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#495057' }}
                            >
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser size={20} color="#dc3545" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.username
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'focus:ring-red-500/50'
                                        }`}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderColor: errors.username ? '#dc3545' : '#ced4da',
                                        color: '#212529'
                                    }}
                                    placeholder="Ingresa tu usuario"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm" style={{ color: '#dc3545' }}>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#495057' }}
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock size={20} color="#dc3545" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.password
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'focus:ring-red-500/50'
                                        }`}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderColor: errors.password ? '#dc3545' : '#ced4da',
                                        color: '#212529'
                                    }}
                                    placeholder="Ingresa tu contraseña"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} color="#dc3545" />
                                    ) : (
                                        <FiEye size={20} color="#dc3545" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm" style={{ color: '#dc3545' }}>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            style={{
                                backgroundColor: '#dc3545',
                                boxShadow: '0 4px 14px 0 rgba(220, 53, 69, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.backgroundColor = '#c82333';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.backgroundColor = '#dc3545';
                                }
                            }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm" style={{ color: '#6c757d' }}>
                            ¿Problemas para iniciar sesión?{' '}
                            <button
                                className="font-medium hover:underline transition-colors duration-200"
                                style={{ color: '#dc3545' }}
                                onClick={() => console.log('Recuperar contraseña')}
                            >
                                Contacta soporte
                            </button>
                        </p>
                    </div>
                </div>

                {/* Version Info */}
                <div className="text-center mt-6">
                    <p className="text-xs" style={{ color: '#6c757d', opacity: 0.6 }}>
                        Cobros Identificados v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}