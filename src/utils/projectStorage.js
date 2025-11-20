import { v4 as uuidv4 } from 'uuid';

// Simple password hashing (for demo purposes - use proper encryption in production)
const hashPassword = (password) => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
};

// Verify password against hash
const verifyPassword = (password, hash) => {
    return hashPassword(password) === hash;
};

// Save project to localStorage
export const saveProject = (projectData) => {
    const projects = getAllProjects();
    const project = {
        ...projectData,
        updatedAt: new Date().toISOString()
    };

    // Update existing project or add new one
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
        projects[existingIndex] = project;
    } else {
        projects.push(project);
    }

    localStorage.setItem('mobile-content-projects', JSON.stringify(projects));
    return project;
};

// Get all projects
export const getAllProjects = () => {
    const projectsJson = localStorage.getItem('mobile-content-projects');
    return projectsJson ? JSON.parse(projectsJson) : [];
};

// Load a specific project by id
export const loadProject = (projectId) => {
    const projects = getAllProjects();
    return projects.find(p => p.id === projectId);
};

// Delete project with password verification
export const deleteProject = (projectId, password) => {
    const projects = getAllProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        throw new Error('프로젝트를 찾을 수 없습니다.');
    }

    if (!verifyPassword(password, project.passwordHash)) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const updatedProjects = projects.filter(p => p.id !== projectId);
    localStorage.setItem('mobile-content-projects', JSON.stringify(updatedProjects));
    return true;
};

// Create new project with metadata
export const createProject = (metadata) => {
    const { title, type, author, password, template } = metadata;

    // Validate password (4 digits)
    if (!password || password.length !== 4 || !/^\d{4}$/.test(password)) {
        throw new Error('비밀번호는 4자리 숫자여야 합니다.');
    }

    const project = {
        id: uuidv4(),
        title,
        type,
        author,
        passwordHash: hashPassword(password),
        blocks: template?.blocks || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    return saveProject(project);
};

// Export password utilities for external use
export { hashPassword, verifyPassword };
