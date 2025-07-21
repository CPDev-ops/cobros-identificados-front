interface DomainStyles {
    gradient: string;
    textColor: string;
}

export const getDomainStyles = (domain: string): DomainStyles => {
    switch (domain.toUpperCase()) {
        case "SALTA":
            return {
                gradient: "from-[#890686] via-[#890686] to-[#67005a]",
                textColor: "#67005a",
            };
        case "ZARATE":
            return {
                gradient: "from-[#ff5400] via-[#ff5400] to-[#cc3e00]",
                textColor: "#ff5400",
            };
        case "PILAR":
            return {
                gradient: "from-[#bd1622] via-[#bd1622] to-[#ff0000]",
                textColor: "#ff0000",
            };
        default:
            return {
                gradient: "from-gray-400 via-gray-400 to-gray-600",
                textColor: "#333333",
            };
    }
};