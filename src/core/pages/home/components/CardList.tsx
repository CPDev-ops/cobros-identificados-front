import { MdAccessTime, MdContentCopy } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { toast } from "react-toastify";
import { format } from "date-fns"
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";



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

export interface RecentOrderDto {
    id?: string;
    amount?: number;
    concept?: string;
    status?: "paid" | "pending";
    created_at?: string; // ISO date string
}

const bodyTest: RecentOrderDto[] = [
    {
        "id": "1b1c2d57-c001-45c4-b586-17642dee2f3d",
        "amount": 1.00,
        "concept": "Pago",
        "status": "paid",
        "created_at": "2025-07-07T16:21:00"
    },
    {
        "id": "0dd29222-9715-4f5d-ab90-0e6b9ab60a6b",
        "amount": 1.00,
        "concept": "Pago",
        "status": "pending",
        "created_at": "2025-07-01T16:04:01"
    },
    {
        "id": "fae4cd94-fa8f-405b-8118-187a070ce20c",
        "amount": 1.00,
        "concept": "Entrada general",
        "status": "paid",
        "created_at": "2025-07-14T17:46:15"
    },
    {
        "id": "55294cb5-c96e-4380-aae9-b67163b8cf99",
        "amount": 1.00,
        "concept": "Ticket Promo",
        "status": "pending",
        "created_at": "2025-07-01T16:04:33"
    },
    {
        "id": "cea40daf-af03-4fd3-bd02-ec9987b73ec2",
        "amount": 1.00,
        "concept": "Pago",
        "status": "paid",
        "created_at": "2025-07-04T16:50:29"
    }
]

const CardList = () => {
    const [isOpen, setIsOpen] = useState(false);


    const handleCopy = (id?: string) => {
        if (!id) return
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
                        className="overflow-hidden space-y-3 max-h-[250px] sm:max-h-[400px] overflow-y-auto"
                    >
                        {bodyTest.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`rounded-full p-1.5 ${order.status === "paid" ? "bg-gradient-to-r from-green-600 to-green-500" : "bg-gradient-to-r from-red-600 to-red-500"
                                            } text-white `}
                                    >
                                        <MdAccessTime size={16}/>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 text-sm text-start">
                                            ${order.amount?.toFixed(2)}
                                        </p>
                                        <p className="text-[11px] sm:text-sm text-gray-500 text-start">
                                            {order.concept}
                                        </p>
                                        <p className="text-[10px] sm:text-sm text-gray-400 text-start">
                                            {order.created_at
                                                ? format(new Date(order.created_at), "d 'de' MMMM 'de' yyyy, hh:mm aaaa", {
                                                    locale: es,
                                                })
                                                : "Sin fecha"}
                                        </p>
                                    </div>
                                </div>
                                {order.id && (
                                    <div className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition">
                                        <button
                                            onClick={() => handleCopy(order.id)}
                                            title="Copiar ID"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            <MdContentCopy className="text-sm" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CardList