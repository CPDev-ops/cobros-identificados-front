import { QRCodeCanvas } from "qrcode.react";
import type { FC } from "react";
import { toast } from "react-toastify"; // opcional si usás alguna librería de notificaciones
import { getDomainStyles } from "../../../utils/css/getDomainStyle";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

interface GenerateOrderCardProps {
    amount: number;
    qrLink: string;
    domain: string
}

const GenerateOrderCard: FC<GenerateOrderCardProps> = ({ amount, qrLink, domain }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(qrLink);
        toast?.success?.("Link copiado al portapapeles"); // Opcional
    };

    const { colorButtonCopyLink } = getDomainStyles(domain)
    return (
        <div className="bg-white rounded shadow-md p-6 text-center w-full max-w-xs mx-auto sm:max-w-sm space-y-4">
            <div>
                <h2 className="text-base  text-gray-900 text-start">Orden generada</h2>
                <p className="text-xs sm:text-sm text-gray-500 text-start">Escaneá el QR o compartí el link</p>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-4">
                <div>
                    <p className="text-green-600  text-xl">${amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Pago</p>
                </div>
                <QRCodeCanvas
                    value={qrLink}
                    size={120}
                    className="mx-auto "
                    bgColor="transparent"
                    fgColor="#000000"
                    level="H"
                />

                <p className="text-[11px] text-gray-500 break-all">
                    {qrLink}
                </p>

                <button
                    onClick={copyToClipboard}
                    className={`mt-2 flex items-center justify-center gap-2 w-full ${colorButtonCopyLink} text-gray-600 hover:text-white text-xs sm:text-sm py-2 px-4 rounded transition`}
                >
                    <HiOutlineClipboardDocument className="text-lg" />
                    Copiar Link
                </button>
            </div>
        </div>
    );
};

export default GenerateOrderCard;
