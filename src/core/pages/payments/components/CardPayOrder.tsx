import type { FC } from "react";
import { getDomainStyles } from "../../../utils/css/getDomainStyle";
import { FaArrowRight } from "react-icons/fa";

interface CardPayOrderProps {
    domain: string;
    amount: number;
    concepto: string;
    onConfirm: () => void;
}

const CardPayOrder: FC<CardPayOrderProps> = ({ domain, amount, concepto, onConfirm }) => {
    const { gradient } = getDomainStyles(domain);

    return (
        <div className={`rounded-xl p-6 w-full max-w-sm mx-auto text-white bg-gradient-to-r ${gradient} space-y-4 text-center shadow-lg`}>
            <div>
                <h2 className="text-lg ">Confirmar Pago</h2>
                <p className="text-xs text-gray-300">Revisá los detalles antes de continuar</p>
            </div>

            <div className="border-y border-gray-300 py-4">
                <p className="text-3xl font-semibold  text-white">${amount.toFixed(2)}</p>
                <p className="text-sm text-gray-300">Pago</p>
            </div>

            <div className="text-left text-xs sm:text-sm  p-4 rounded space-y-3">
                <p className=" text-white">Detalles del pago:</p>

                <div className="flex justify-between">
                    <span className=" text-gray-200">Monto:</span>
                    <span className="text-white">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className=" text-gray-200">Concepto:</span>
                    <span className="text-white text-right">{concepto}</span>
                </div>
                <div className="flex justify-between">
                    <span className=" text-gray-200">Método:</span>
                    <span className="text-white">Mercado Pago</span>
                </div>
            </div>


            <button
                onClick={onConfirm}
                className="bg-white text-xs text-gray-500 w-full rounded py-2 px-4 hover:bg-gray-100 flex items-center justify-center gap-2 transition"
            >
                <img
                    src="/images/mp-logo.png" // Asegurate que esté en /public/images/
                    alt="Logo Mercado Pago"
                    className="h-6 w-auto object rounded"
                />
                <span className="truncate">Pagá seguro con Mercado Pago</span>
            </button>


            <p className="text-[10px] text-gray-300 mt-2">
                Serás redirigido a Mercado Pago para completar el pago de forma segura.
            </p>
        </div>
    );
};

export default CardPayOrder;
