import { useEffect, useState, type FC } from "react";
import { ContainerPages } from "../../shared/ContainerPages"
import { SidebarPage } from "../../shared/ResponsiveSidebar"
import LogoHeader from "../../shared/ui/LogoHeader"
import CardPaySuccess from "./components/CardPaySuccess";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../service/connection";

interface PageSuccessProps {
    domain: string;
}

interface PaymentResult {
    order_id: string;
    amount: number;
    concept: string;
    status: string;
    customer_name?: string;
    customer_dni?: string;
    customer_email?: string;
    paid_at?: string;
    payment_id?: string;
    error?: string;
}

const PageSuccess: FC<PageSuccessProps> = ({ domain }) => {
    const { orderId } = useParams();
    /*  const { search } = useLocation(); */ // Para obtener query parameters como payment_id
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("ORDER ID PARA TRAER-->", orderId);
    /*    console.log("SEARCH PARA TRAER-->", search); */

    const getPaymentDetails = async () => {
        if (!orderId) {
            setError("ID de orden no encontrado");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/api/orders/${orderId}/result`);
            console.log("Payment result data:", response.data);
            setPaymentResult(response.data);

        } catch (err) {
            console.error('Error fetching payment result:', err);
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.error || err.message;
                setError(errorMessage);
            } else {
                setError('Error al cargar el resultado del pago');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPaymentDetails();
    }, [orderId, /* search */])

    // Función para formatear fecha
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Fecha no disponible";

        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <SidebarPage>
                <ContainerPages>
                    <div className="space-y-16 max-w-5xl mx-auto pt-4">
                        <LogoHeader domain={domain} />
                        <div className="flex justify-center items-center min-h-[400px]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                                <p className="text-gray-600">Cargando resultado del pago...</p>
                            </div>
                        </div>
                    </div>
                </ContainerPages>
            </SidebarPage>
        );
    }

    if (error) {
        return (
            <SidebarPage>
                <ContainerPages>
                    <div className="space-y-16 max-w-5xl mx-auto pt-4">
                        <LogoHeader domain={domain} />
                        <div className="flex justify-center items-center min-h-[400px]">
                            <div className="text-center">
                                <div className="text-red-500 text-xl mb-4">❌</div>
                                <p className="text-red-600 font-medium">Error: {error}</p>
                            </div>
                        </div>
                    </div>
                </ContainerPages>
            </SidebarPage>
        );
    }

    if (!paymentResult) {
        return (
            <SidebarPage>
                <ContainerPages>
                    <div className="space-y-16 max-w-5xl mx-auto pt-4">
                        <LogoHeader domain={domain} />
                        <div className="flex justify-center items-center min-h-[400px]">
                            <p className="text-gray-600">No se encontró información del pago</p>
                        </div>
                    </div>
                </ContainerPages>
            </SidebarPage>
        );
    }


    return (
        <SidebarPage>
            <ContainerPages>
                <div className="space-y-16 max-w-5xl mx-auto pt-4">
                    <LogoHeader domain={domain} />
                    <CardPaySuccess
                        type={paymentResult.concept}
                        domain={domain}
                        amount={paymentResult.amount}
                        dateTime={formatDate(paymentResult.paid_at)}
                        dni={paymentResult.customer_dni || "No disponible"}
                        paymentId={paymentResult.payment_id || "No disponible"}
                    />
                </div>
            </ContainerPages>
        </SidebarPage>
    )
}
export default PageSuccess