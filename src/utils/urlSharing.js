import LZString from 'lz-string';

/**
 * Encode project data into a compressed, URL-safe string
 * Uses LZ-String compression for maximum size reduction (60-80% smaller)
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

        // Compress and encode to URL-safe format
        // This achieves 60-80% size reduction compared to base64
        return LZString.compressToEncodedURIComponent(jsonStr);
    } catch (error) {
        console.error('Failed to encode project:', error);
        throw new Error('프로젝트 인코딩에 실패했습니다.');
    }
};

/**
 * Decode project data from compressed URL parameter
 */
export const decodeProjectFromUrl = (encodedData) => {
    try {
        // Decompress from URL-safe format
        const jsonStr = LZString.decompressFromEncodedURIComponent(encodedData);

        if (!jsonStr) {
            throw new Error('Invalid encoded data');
        }

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
