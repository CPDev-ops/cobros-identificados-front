import { MdAccessTime, MdContentCopy } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "react-toastify";
import { format } from "date-fns"
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_URL } from "../../../../service/connection";

export interface PaymentDto {
    id: string;
    amount: number;
    concept: string;
    status: "pending" | "paid";
    preference_id: string | null;
    payment_id: string | null;
    dni: string | null;
    email: string | null;
    created_at: string;
    paid_at: string | null;
}

export interface OrderFromApi {
    id: string;
    amount: number;
    concept: string;
    status: "paid" | "pending";
    customer_dni: string | null;
    customer_email: string | null;
    customer_name: string | null;
    created_at: string;
    paid_at: string | null;
}

export interface ApiResponse {
    orders: OrderFromApi[];
    pagination: {
        page: number;
        pages: number;
        per_page: number;
        total: number;
    };
}

const CardList = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [orders, setOrders] = useState<OrderFromApi[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener las órdenes de la API
    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Fetching from:', `${API_URL}/api/orders?page=1&per_page=5`);

            const response = await fetch(`${API_URL}/api/orders?page=1&per_page=5`, {
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Response URL:', response.url);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            // Verificar si la respuesta es realmente JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Necesitas hacer login para ver las órdenes');
            }

            const data: ApiResponse = await response.json();
            setOrders(data.orders);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Error al cargar las órdenes');
            toast.error('Error al cargar las órdenes recientes');
        } finally {
            setLoading(false);
        }
    };

    // Cargar órdenes cuando el componente se monta
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("ID copiado al portapapeles")
    }

    return (
        <div className="bg-white rounded shadow-md p-6 text-center w-full max-w-xs mx-auto sm:max-w-sm space-y-4">
            {/* HEADER */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center cursor-pointer select-none"
            >
                <div className="text-start">
                    <h2 className="text-lg text-gray-900 font-semibold">Órdenes recientes</h2>
                    <p className="text-xs text-gray-500">Últimas órdenes generadas</p>
                </div>
                <div className="text-gray-500">
                    {isOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
                </div>
            </div>

            {/* LISTA ANIMADA */}
            <AnimatePresence>
                {isOpen && (
                    <div className="w-full bg-gray-200 py-[0.1%] border-gray-400"></div>
                )}
                {isOpen && (
                    <motion.div
                        key="orderList"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                        className="overflow-hidden space-y-3 max-h-[250px] overflow-y-auto"
                    >
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <span className="ml-2 text-gray-600">Cargando órdenes...</span>
                            </div>
                        ) : error ? (
                            <div className="text-center py-4">
                                <p className="text-red-500 text-sm">{error}</p>
                                <button
                                    onClick={fetchOrders}
                                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                >
                                    Reintentar
                                </button>
                            </div>
                        ) : !orders || orders.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-sm">No hay órdenes recientes</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`rounded-full p-1.5 ${order.status === "paid"
                                                ? "bg-gradient-to-r from-green-600 to-green-500"
                                                : "bg-gradient-to-r from-red-600 to-red-500"
                                                } text-white`}
                                        >
                                            <MdAccessTime size={16} />
                                        </div>
                                        <div>
                                            <p className="text-gray-800 text-sm text-start">
                                                ${order.amount.toFixed(2)}
                                            </p>
                                            <p className="text-[11px] sm:text-sm text-gray-500 text-start">
                                                {order.concept}
                                            </p>
                                            <p className="text-[10px] sm:text-sm text-gray-400 text-start">
                                                {format(new Date(order.created_at), "d 'de' MMMM 'de' yyyy, hh:mm aaaa", {
                                                    locale: es,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                        <button
                                            onClick={() => handleCopy(order.id)}
                                            title="Copiar ID"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            <MdContentCopy className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CardList