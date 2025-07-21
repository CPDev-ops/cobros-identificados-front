import { QRCodeCanvas } from "qrcode.react";
import { IoClose } from "react-icons/io5";
import { getDomainStyles, getDomainStylesDark } from "../../../../utils/css/getDomainStyle";

interface ModalQrProps {
    value: string;
    onClose: () => void;
    domain: string
}
const ModalQr: React.FC<ModalQrProps> = ({ onClose, value, domain }) => {
    const { gradient } = getDomainStyles(domain);
    const { gradientDark } = getDomainStylesDark(domain)
    return (
        <div className={`relative text-white bg-gradient-to-br py-12 ${gradient} rounded-lg p-6 space-y-2 text-center  `}>
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white hover:opacity-80 text-xl"
            >
                <IoClose size={16} />
            </button>
            <h2 className="text-lg mb-1 text-white">Orden generada</h2>
            <p className="text-sm mb-4 opacity-80 text-gray-100">Escaneá el QR</p>
            <div className={`flex justify-center p-4 bg-gradient-to-r ${gradientDark} rounded-3xl  `}>
                <QRCodeCanvas
                    value={value}
                    size={120}
                    bgColor="transparent"
                    fgColor="#ffffff"
                    level="H"
                />
            </div>
        </div>
    )
}
export default ModalQr