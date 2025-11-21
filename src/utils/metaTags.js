/**
 * Update meta tags dynamically based on project data
 * This improves social media sharing previews
 */
export const updateMetaTags = (project) => {
    if (!project) return;

    const title = `${project.title} - ${project.author}`;
    const description = getProjectDescription(project);
    const url = window.location.href;

    // Update page title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMeta = (selector, attribute, value) => {
        let element = document.querySelector(selector);
        if (element) {
            element.setAttribute(attribute, value);
        } else {
            element = document.createElement('meta');
            if (selector.includes('property=')) {
                const prop = selector.match(/property="([^"]+)"/)[1];
                element.setAttribute('property', prop);
            } else if (selector.includes('name=')) {
                const name = selector.match(/name="([^"]+)"/)[1];
                element.setAttribute('name', name);
            }
            element.setAttribute(attribute, value);
            document.head.appendChild(element);
        }
    };

    // Update basic meta tags
    updateMeta('meta[name="title"]', 'content', title);
    updateMeta('meta[name="description"]', 'content', description);

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:url"]', 'content', url);

    // Update Twitter Card tags
    updateMeta('meta[property="twitter:title"]', 'content', title);
    updateMeta('meta[property="twitter:description"]', 'content', description);
    updateMeta('meta[property="twitter:url"]', 'content', url);
};

/**
 * Get project description from blocks
 */
const getProjectDescription = (project) => {
    if (!project || !project.blocks) return `${project.author}의 ${project.type}`;

    // Find first text block
    const textBlock = project.blocks.find(block =>
        block.type === 'text' && block.content && block.content.text
    );

    if (textBlock) {
        const text = textBlock.content.text;
        // Limit to 200 characters for meta description
        return text.length > 200 ? text.substring(0, 197) + '...' : text;
    }

    return `${project.author}의 ${project.type}`;
};
