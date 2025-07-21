import { getDomainStyles } from "../../../utils/css/getDomainStyle";

interface OrderFormProps {
    domain: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ domain }) => {
    const { gradient } = getDomainStyles(domain);

    return (
        <div className="bg-white text-gray-900 py-6 rounded shadow-md w-full max-w-xs sm:max-w-sm mx-auto space-y-6">
            <div className="px-6">
                <h2 className="text-xl">Nueva Orden</h2>
                <p className="text-xs text-gray-500">Generá un link de pago</p>
            </div>
            <div className="w-full bg-gray-200 py-[0.1%] border-gray-400"></div>
            <form className="space-y-6 px-6">
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Monto *</label>
                    <input
                        type="number"
                        placeholder="1.000.00"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-500 mb-1">Concepto (opcional)</label>
                    <textarea
                        placeholder="Descripción del pago"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${gradient} text-white py-2 rounded hover:opacity-90`}
                >
                    Generar Orden
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
