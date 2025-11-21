/**
 * URL Shortener Service
 * Uses is.gd API for direct URL shortening without preview pages
 */

/**
 * Shorten a long URL using is.gd API
 * is.gd provides DIRECT redirects without preview pages (unlike TinyURL)
 * @param {string} longUrl - The long URL to shorten
 * @returns {Promise<string>} - The shortened URL
 */
export const shortenUrl = async (longUrl) => {
    try {
        // is.gd API endpoint (free, no API key, DIRECT redirects)
        const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const shortUrl = await response.text();

        // Validate the response is a URL
        if (!shortUrl.startsWith('http')) {
            throw new Error('Invalid response from URL shortener');
        }

        return shortUrl.trim();
    } catch (error) {
        console.error('URL shortening failed:', error);
        // Fallback: return the original long URL
        // Better to have a long working URL than a broken short one
        return longUrl;
    }
};

/**
 * Alternative: v.gd URL shortener (backup option, same service as is.gd)
 */
export const shortenUrlVgd = async (longUrl) => {
    try {
        const apiUrl = `https://v.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const shortUrl = await response.text();

        if (!shortUrl.startsWith('http')) {
            throw new Error('Invalid response from URL shortener');
        }

        return shortUrl.trim();
    } catch (error) {
        console.error('v.gd URL shortening failed:', error);
        return longUrl;
    }
};
