import { HiLockClosed, HiShieldCheck, HiStar } from "react-icons/hi"

const Footer = () => {
    return (
        <footer className=" text-center text-sm text-gray-700 py-6 border-t-2 border-gray-200 space-y-4 mt-10">
            <div className="flex flex-wrap justify-center gap-4 text-[70%]">
                <span className="flex items-center gap-2 bg-gradient-to-r from-[#39a935] via-[#009540] to-[#39a935] text-white px-3 py-1 rounded-full ">
                    <HiShieldCheck className="text-white text-lg" />
                    100% Seguro
                </span>
                <span className="flex items-center gap-2 bg-gradient-to-r from-[#39a935] via-[#009540] to-[#39a935] text-white px-3 py-1 rounded-full ">
                    <HiLockClosed className="text-white text-lg" />
                    Certificado por PCI
                </span>
                <span className="flex items-center gap-2 bg-gradient-to-r from-[#39a935] via-[#009540] to-[#39a935] text-white px-3 py-1 rounded-full ">
                    <HiStar className="text-white text-lg" />
                    4.9/5 estrellas
                </span>
            </div>
            <div className="text-gray-500 text-[85%] sm:text-xs">
                © 2025 Bingo Oasis Pilar. Todos los derechos reservados.
                <br />
                <span className="text-[80%] sm:text-xs text-gray-400 font-extralight">Plataforma de pagos segura y confiable.</span>
            </div>
        </footer>
    )
}

export default Footer
