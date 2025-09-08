import logoPilar from "/images/PILAR/LOGO.png";
import logoZarate from "/images/ZARATE/LOGO.png";
import logoNca from "/images/SALTA/LOGO.png";

interface LogoHeaderProps {
    domain: string;
    title?: string
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ domain,title="Creá tu orden de cobro con Mercado Pago" }) => {
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
                {title  }
            </p>
        </div>
    );
};

export default LogoHeader;
