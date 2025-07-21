interface DomainStyles {
    gradient: string;
    textColor: string;
    colorButtonCopyLink: string
}

interface DomainStylesDark {
    gradientDark: string;
    textColor: string;
}

export const getDomainStyles = (domain: string): DomainStyles => {
    switch (domain.toUpperCase()) {
        case "SALTA":
            return {
                gradient: "from-[#890686] via-[#890686] to-[#67005a]",
                textColor: "#67005a",
                colorButtonCopyLink: "bg-[#890686]/20 hover:bg-[#890686]/50"
            };
        case "ZARATE":
            return {
                gradient: "from-[#ff5400] via-[#ff5400] to-[#cc3e00]",
                textColor: "#ff5400",
                colorButtonCopyLink: "bg-[#ff5400]/20 hover:bg-[#ff5400]/50"

            };
        case "PILAR":
            return {
                gradient: "from-[#bd1622] via-[#bd1622] to-[#ff0000]",
                textColor: "#ff0000",
                colorButtonCopyLink: "bg-[#bd1622]/20 hover:bg-[#bd1622]/50"

            };
        default:
            return {
                gradient: "from-gray-400 via-gray-400 to-gray-600",
                textColor: "#333333",
                colorButtonCopyLink: "bg-gray-400/80 hover:bg-gray-400/20"

            };
    }
};

export const getDomainStylesDark = (domain: string): DomainStylesDark => {
    switch (domain.toUpperCase()) {
        case "SALTA":
            return {
                gradientDark: "from-[#5d044e] via-[#5d044e]/80 to-[#720070]/40", // Más oscuro que #890686 y #67005a
                textColor: "#470046",
            };
        case "ZARATE":
            return {
                gradientDark: "from-[#b33f00] via-[#b33f00]/80 to-[#ff5400]/40", // Más oscuro que #ff5400 y #cc3e00
                textColor: "#992f00",
            };
        case "PILAR":
            return {
                gradientDark: "from-[#8a0e19] via-[#8a0e19]/80 to-[#BC0303]/40", // Más oscuro que #bd1622 y #ff0000
                textColor: "#990000",
            };
        default:
            return {
                gradientDark: "from-gray-700 via-gray-700 to-gray-800",
                textColor: "#222222",
            };
    }
};