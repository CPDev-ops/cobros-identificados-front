import { useState } from "react";
import { getDomainStyles } from "../../../utils/css/getDomainStyle";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
export type DtoData = {
    monto: string;
    concepto: string
    link?: string;

}
interface OrderFormProps {
    domain: string;
    success: (data: DtoData) => void
    isOpen: boolean;
    setIsOpen: (boolean: boolean) => void
}

const OrderForm: React.FC<OrderFormProps> = ({ domain, success ,isOpen,setIsOpen}) => {
    const { gradient } = getDomainStyles(domain);
    const [monto, setMonto] = useState<string>('');
    const [concepto, setConcepto] = useState<string>('')
    //logic open card
  

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(monto, concepto);
        success({ concepto, monto, link: "http://localhost:5173/pay-order" })
    }

    return (
        <div className="bg-white text-gray-900 py-6 rounded shadow-md w-full max-w-xs sm:max-w-sm mx-auto space-y-6">
            <div className="px-6 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-2">
                    <div>
                        <h2 className="text-lg font-semibold">Nueva Orden</h2>
                        <p className="text-xs text-gray-500">Generá un link de pago</p>
                    </div>
                </div>
                {isOpen ? (
                    <FiChevronUp className="text-gray-500 text-lg" />
                ) : (
                    <FiChevronDown className="text-gray-500 text-lg" />
                )}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                        className="overflow-hidden"
                    >
                        <div className="w-full bg-gray-200 py-[0.1%] border-gray-400"></div>
                        <form className="space-y-6 px-6 pt-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Monto *</label>
                                <input
                                    type="number"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    placeholder="1.000,00"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Concepto (opcional)</label>
                                <textarea
                                    value={concepto}
                                    onChange={(e) => setConcepto(e.target.value)}
                                    placeholder="Descripción del pago"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-gradient-to-r ${gradient} text-white py-2 rounded hover:opacity-90 transition`}
                            >
                                Generar Orden
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
};

export default OrderForm;
