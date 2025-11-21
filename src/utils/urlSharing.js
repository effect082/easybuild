/**
 * Encode project data into a URL-safe string
 * Uses compression to reduce URL length
 */
export const encodeProjectForUrl = async (project) => {
    try {
        // Dynamically import pako to ensure it works in production
        const pako = await import('pako');

        // Create a minimal version of project data (exclude password hash for security)
        const minimalProject = {
            id: project.id,
            title: project.title,
            type: project.type,
            author: project.author,
            category: project.category,
            blocks: project.blocks,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
        };

        // Convert to JSON string
        const jsonStr = JSON.stringify(minimalProject);

        // Compress using pako
        const compressed = pako.deflate(jsonStr);

        // Convert to base64
        const base64 = btoa(String.fromCharCode.apply(null, compressed));

        // Make URL-safe
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    } catch (error) {
        console.error('Failed to encode project:', error);
        throw new Error('프로젝트 인코딩에 실패했습니다.');
    }
};

/**
 * Decode project data from URL parameter
 */
export const decodeProjectFromUrl = async (encodedData) => {
    try {
        // Dynamically import pako to ensure it works in production
        const pako = await import('pako');

        // Restore base64 characters
        let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');

        // Add padding if needed
        while (base64.length % 4) {
            base64 += '=';
        }

        // Decode from base64
        const compressed = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

        // Decompress
        const jsonStr = pako.inflate(compressed, { to: 'string' });

        // Parse JSON
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Failed to decode project:', error);
        throw new Error('프로젝트를 불러올 수 없습니다.');
    }
};

/**
 * Get first text content from blocks for meta description
 */
export const getProjectDescription = (project) => {
    if (!project || !project.blocks) return '';

    // Find first text block
    const textBlock = project.blocks.find(block =>
        block.type === 'text' && block.content && block.content.text
    );

    if (textBlock) {
        const text = textBlock.content.text;
        // Limit to 200 characters for meta description
        return text.length > 200 ? text.substring(0, 197) + '...' : text;
    }

    // Fallback to project type
    return `${project.author}의 ${project.type}`;
};
