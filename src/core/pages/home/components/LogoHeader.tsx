import logoPilar from "/images/pilar/LOGO.png";
import logoZarate from "/images/zarate/LOGO.png";
import logoNca from "/images/salta/LOGO.png";

interface LogoHeaderProps {
    domain: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ domain }) => {
    const logos: Record<string, string> = {
        PILAR: logoPilar,
        ZARATE: logoZarate,
        SALTA: logoNca,
    };

    const logo = logos[domain.toUpperCase()] || logoPilar; // fallback por si no existe

    return (
        <div className="text-center space-y-4">
            <img src={logo} alt={`Logo ${domain}`} className="mx-auto w-52 sm:w-44" />
            <p className="text-sm sm:text-base opacity-80 text-gray-700">
                Creá tu orden de cobro con Mercado Pago
            </p>
        </div>
    );
};

export default LogoHeader;
