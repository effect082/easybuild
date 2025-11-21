/**
 * Encode project data into a URL-safe string
 * Uses simple base64 encoding (no compression)
 */
export const encodeProjectForUrl = (project) => {
    try {
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

        // Convert to JSON string (compact, no whitespace)
        const jsonStr = JSON.stringify(minimalProject);

        // Encode to base64
        const base64 = btoa(unescape(encodeURIComponent(jsonStr)));

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
export const decodeProjectFromUrl = (encodedData) => {
    try {
        // Restore base64 characters
        let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');

        // Add padding if needed
        while (base64.length % 4) {
            base64 += '=';
        }

        // Decode from base64
        const jsonStr = decodeURIComponent(escape(atob(base64)));

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
