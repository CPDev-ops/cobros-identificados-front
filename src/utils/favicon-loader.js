/**
 * Script para cargar favicon dinámicamente según el dominio
 */
(function () {
    // Función para obtener el dominio desde los parámetros de la URL o el hostname
    function getDomainFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const domainParam = urlParams.get('domain');
        console.log(urlParams, domainParam)
        if (domainParam) {
            return domainParam.toLowerCase();
        }

        // Si no hay parámetro, usar el hostname
        const hostname = window.location.hostname;

        // Mapear hostnames a dominios
        const domainMap = {
            'localhost': 'PILAR',
            '127.0.0.1': 'PILAR',
            'pilar.example.com': 'PILAR',
            'salta.example.com': 'SALTA',
            'zarate.example.com': 'ZARATE',
            'promoslot.oasiszarate.com.ar': 'ZARATE'
        };

        return domainMap[hostname] || 'PILAR'; // Default a PILAR si no encuentra
    }

    // Función para cambiar el favicon
    function changeFavicon(domain) {
        // Construir la ruta del favicon
        const faviconPath = `/images/${domain}/LOADER.png`;

        // Buscar el link existente del favicon o crear uno nuevo
        let faviconLink = document.querySelector('link[rel="icon"]') ||
            document.querySelector('link[rel="shortcut icon"]');

        if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
        }

        // Cambiar el href del favicon
        faviconLink.href = faviconPath;
        faviconLink.type = 'image/png';

        console.log(`Favicon cargado para dominio: ${domain} - ${faviconPath}`);

        // También cambiar el title si quieres
        const titles = {
            'PILAR': 'Cobros Identificados - Pilar',
            'SALTA': 'Cobros Identificados - Salta',
            'ZARATE': 'Cobros Identificados - Zárate'
        };

        if (titles[domain]) {
            document.title = titles[domain];
        }
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            const domain = getDomainFromUrl();
            changeFavicon(domain);
        });
    } else {
        const domain = getDomainFromUrl();
        changeFavicon(domain);
    }
})();
