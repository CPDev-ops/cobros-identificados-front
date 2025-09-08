import { useEffect } from 'react';

// Función para obtener el dominio desde los parámetros de la URL o el hostname
function getDomainFromUrl(): string {
    console.log('📍 Detectando dominio...');

    const urlParams = new URLSearchParams(window.location.search);
    const domainParam = urlParams.get('domain');

    console.log('🔍 Parámetro domain en URL:', domainParam);
    console.log('🌐 Hostname actual:', window.location.hostname);
    console.log('🔗 URL completa:', window.location.href);

    if (domainParam) {
        console.log('✅ Usando dominio del parámetro:', domainParam);
        return domainParam.toUpperCase();
    }

    // Si no hay parámetro, usar el hostname
    const hostname = window.location.hostname;

    // Mapear hostnames a dominios
    const domainMap: Record<string, string> = {
        'localhost': 'PILAR',
        '127.0.0.1': 'PILAR',
        'pilar.example.com': 'PILAR',
        'salta.example.com': 'SALTA',
        'zarate.example.com': 'ZARATE',
        'promoslot.oasiszarate.com.ar': 'ZARATE'
    };

    const mappedDomain = domainMap[hostname] || 'PILAR';
    console.log('🗺️ Dominio mapeado desde hostname:', mappedDomain);

    return mappedDomain;
}

// Hook personalizado para manejar el favicon dinámico
export function useDynamicFavicon() {
    useEffect(() => {
        console.log('🚀 Hook useDynamicFavicon iniciado');

        const domain = getDomainFromUrl();

        // Cambiar el favicon
        const changeFavicon = (domain: string) => {
            console.log('🎨 Cambiando favicon para dominio:', domain);

            // Construir la ruta del favicon
            const faviconPath = `/images/${domain}/LOADER.png`;
            console.log('📁 Ruta del favicon:', faviconPath);

            // Buscar el link existente del favicon o crear uno nuevo
            let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement ||
                document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;

            if (!faviconLink) {
                console.log('➕ Creando nuevo elemento link para favicon');
                faviconLink = document.createElement('link');
                faviconLink.rel = 'icon';
                document.head.appendChild(faviconLink);
            } else {
                console.log('🔄 Actualizando elemento link existente');
            }
            // Cambiar el href del favicon
            faviconLink.href = faviconPath;
            faviconLink.type = 'image/png';

            console.log('✅ Favicon cargado para dominio:', domain, '- Ruta:', faviconPath);

            // También cambiar el title
            const titles: Record<string, string> = {
                'PILAR': 'Cobros Identificados - Pilar',
                'SALTA': 'Cobros Identificados - Salta',
                'ZARATE': 'Cobros Identificados - Zárate'
            };

            if (titles[domain]) {
                document.title = titles[domain];
                console.log('📝 Título cambiado a:', titles[domain]);
            }

            // Verificar si la imagen existe
            const img = new Image();
            img.onload = function () {
                console.log('✅ Imagen del favicon cargada correctamente:', faviconPath);
            };
            img.onerror = function () {
                console.error('❌ Error: No se pudo cargar la imagen del favicon:', faviconPath);
                console.log('💡 Verifica que existe el archivo en public' + faviconPath);
            };
            img.src = faviconPath;
        };

        changeFavicon(domain);

        // Cleanup function (opcional)
        return () => {
            console.log('🧹 Limpieza del hook useDynamicFavicon');
        };
    }, []); // El array vacío asegura que solo se ejecute una vez al montar
}

// Hook alternativo que devuelve el dominio actual
export function useDomain(): string {
    return getDomainFromUrl();
}
