import { useEffect, useState, type FC } from "react";
import { SidebarPage } from "../../shared/ResponsiveSidebar";
import { ContainerPages } from "../../shared/ContainerPages";
import LogoHeader from "../../shared/ui/LogoHeader";
import CardPayOrder from "./components/CardPayOrder";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../service/connection";
import { getDomainStyles } from "../../utils/css/getDomainStyle";

interface PagePayOrderProps {
    domain: string;
}

interface OrderData {
    id: string;
    amount: number;
    concept: string;
    status: string;
    mp_preference_id: string | null;
    created_at: string;
    payment_url: string;
    qr_code: string;
}

const PagePayOrder: FC<PagePayOrderProps> = ({ domain }) => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    console.log("Order ID:", orderId);
    const { gradient } = getDomainStyles(domain);
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setError("ID de orden no encontrado");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
                console.log("Order data:", response.data);
                setOrder(response.data);

            } catch (err) {
                console.error('Error fetching order:', err);
                if (axios.isAxiosError(err)) {
                    const errorMessage = err.response?.data?.error || err.message;
                    setError(errorMessage);
                } else {
                    setError('Error al cargar la orden');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const handleConfirm = async () => {
        if (!orderId) return;

        try {
            // Crear el pago en Mercado Pago
            const response = await axios.post(`${API_URL}/api/orders/${orderId}/payment`);

            // Redirigir a Mercado Pago
            if (response.data.init_point) {
                window.location.href = response.data.init_point;
            }

        } catch (err) {
            console.error('Error creating payment:', err);
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.error || err.message;
                alert(`Error al iniciar el pago: ${errorMessage}`);
            } else {
                alert('Error al iniciar el pago');
            }
        }
    };

    // Loading Card Component
    const LoadingCard = () => (
        <div className={`rounded-xl p-8 w-full max-w-md mx-auto text-white bg-gradient-to-r ${gradient} shadow-lg`}>
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                </div>
                <h2 className="text-xl font-semibold">Cargando orden...</h2>
                <p className="text-white/80">Obteniendo información del pago</p>
            </div>
        </div>
    );

    // Error Card Component
    const ErrorCard = () => (
        <div className={`rounded-xl p-8 w-full max-w-md mx-auto text-white bg-gradient-to-r ${gradient} shadow-lg`}>
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold">Error al cargar</h2>
                <p className="text-white/90">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );

    // Not Found Card Component
    const NotFoundCard = () => (
        <div className={`rounded-xl p-8 w-full max-w-md mx-auto text-white bg-gradient-to-r ${gradient} shadow-lg`}>
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.291-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold">Orden no encontrada</h2>
                <p className="text-white/90">La orden solicitada no existe o ha expirado</p>
                <div className="space-y-2">
                    <p className="text-sm text-white/70">ID de orden: {orderId}</p>
                </div>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                    >
                        Crear nueva orden
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200 transform hover:scale-105"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <SidebarPage>
            <ContainerPages>
                <div className="space-y-16 max-w-5xl mx-auto pt-4">
                    <LogoHeader title="" domain={domain} />

                    <div className="flex justify-center items-center min-h-[400px]">
                        {loading && <LoadingCard />}
                        {error && <ErrorCard />}
                        {!loading && !error && !order && <NotFoundCard />}
                        {!loading && !error && order && (
                            <CardPayOrder
                                amount={order.amount}
                                concepto={order.concept}
                                domain={domain}
                                onConfirm={handleConfirm}
                            />
                        )}
                    </div>
                </div>
            </ContainerPages>
        </SidebarPage>
    );
}

export default PagePayOrder;