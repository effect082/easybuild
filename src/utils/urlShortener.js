/**
 * URL Shortener Service
 * Uses free TinyURL API to create short URLs
 */

/**
 * Shorten a long URL using TinyURL API
 * @param {string} longUrl - The long URL to shorten
 * @returns {Promise<string>} - The shortened URL
 */
export const shortenUrl = async (longUrl) => {
    try {
        // TinyURL API endpoint (free, no API key needed)
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

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
 * Alternative: is.gd URL shortener (backup option)
 */
export const shortenUrlIsGd = async (longUrl) => {
    try {
        const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(longUrl)}`;

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
        console.error('is.gd URL shortening failed:', error);
        return longUrl;
    }
};
