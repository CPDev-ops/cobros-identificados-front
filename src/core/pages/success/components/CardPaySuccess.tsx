import { MdAccessTime, MdPerson, MdCreditCard } from "react-icons/md"
import type { FC } from "react"
import { getDomainStyles } from "../../../utils/css/getDomainStyle"
import { GoCheckCircleFill } from "react-icons/go"

interface CardPaySuccessProps {
    amount: number
    dateTime: string
    dni: string
    paymentId: string
    domain: string
}

const CardPaySuccess: FC<CardPaySuccessProps> = ({ amount, dateTime, /* dni, */ paymentId, domain }) => {
    const { gradient } = getDomainStyles(domain)
    return (
        <div className={`rounded-xl p-6 w-full max-w-xs sm:max-w-sm mx-auto text-white bg-gradient-to-r ${gradient} space-y-5 text-center shadow-lg`}>
            {/* Icono y mensaje */}
            <div className="flex flex-col items-center gap-1">
                <GoCheckCircleFill className="text-green-600 bg-white rounded-full text-5xl" />
                <h2 className="text-lg ">¡Gracias! Tu pago fue recibido</h2>
            </div>

            {/* Monto */}
            <div className="border-t border-gray-300 pt-2 space-y-1">
                <p className="text-2xl font-semibold">${amount.toFixed(2)}</p>
                <p className="text-sm text-white/90">Pago</p>
            </div>

            {/* Detalles */}
            <div className="space-y-3 text-sm text-left">
                <div className="flex items-center bg-white text-gray-800 rounded-md px-4 py-3 gap-3">
                    <MdAccessTime className="text-lg text-red-600" />
                    <div>
                        <p className=" ">Fecha y hora</p>
                        <p className=" text-gray-600/90">{dateTime}</p>
                    </div>
                </div>
                {/* 
                <div className="flex items-center bg-white text-gray-800 rounded-md px-4 py-3 gap-3">
                    <MdPerson className="text-lg text-red-600" />
                    <div>
                        <p className=" ">DNI/CUIL</p>
                        <p className=" text-gray-600/90">{dni}</p>
                    </div>
                </div> */}

                <div className="flex items-center bg-white text-gray-800 rounded-md px-4 py-3 gap-3">
                    <MdCreditCard className="text-lg text-red-600" />
                    <div>
                        <p className=" ">ID de Pago</p>
                        <p className=" text-gray-600/90">{paymentId}</p>
                    </div>
                </div>
            </div>

            {/* Texto final */}
            <p className="text-[10px] border-t border-t-gray-300 text-gray-300 pt-2">
                Tu pago fue procesado exitosamente. Conservá esta información como comprobante.
            </p>
        </div>
    )
}

export default CardPaySuccess
