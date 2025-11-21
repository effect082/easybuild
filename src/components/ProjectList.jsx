import React, { useState } from 'react';
import { getAllProjects, deleteProject } from '../utils/projectStorage';
import DeleteProjectDialog from './DeleteProjectDialog';

const ProjectList = ({ onClose, onLoadProject, onCreateNew }) => {
    const [projects, setProjects] = useState(getAllProjects());
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'personal', 'team'

    const handleDelete = (password) => {
        try {
            deleteProject(deleteTarget.id, password);
            setProjects(getAllProjects());
            setDeleteTarget(null);
        } catch (err) {
            throw err; // Re-throw to be caught by DeleteProjectDialog
        }
    };

    const handleOpen = (project) => {
        onLoadProject(project);
        onClose();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredProjects = projects.filter(p => {
        if (filter === 'all') return true;
        const category = p.category || 'personal'; // Default to personal if undefined
        return category === filter;
    });

    return (
        <>
            <div style={{
                padding: '40px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                minHeight: '100vh',
                backgroundColor: '#f8fafc'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
                            내 프로젝트
                        </h1>
                        <p style={{ color: '#64748b' }}>
                            만들어진 콘텐츠를 관리하고 새로운 프로젝트를 시작하세요.
                        </p>
                    </div>
                    <button
                        onClick={onCreateNew}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
                            transition: 'all 0.2s'
                        }}
                    >
                        + 새 프로젝트
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0' }}>
                    {[
                        { id: 'all', label: '전체' },
                        { id: 'personal', label: '개인' },
                        { id: 'team', label: '팀' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            style={{
                                padding: '12px 4px',
                                background: 'none',
                                border: 'none',
                                borderBottom: `2px solid ${filter === tab.id ? '#4f46e5' : 'transparent'}`,
                                color: filter === tab.id ? '#4f46e5' : '#64748b',
                                fontWeight: filter === tab.id ? '600' : '500',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {filteredProjects.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 0',
                        color: '#94a3b8',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px dashed #cbd5e1'
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                            {filter === 'all'
                                ? '아직 만들어진 프로젝트가 없습니다.'
                                : `${filter === 'personal' ? '개인' : '팀'} 프로젝트가 없습니다.`}
                        </p>
                        {filter === 'all' && (
                            <button
                                onClick={onCreateNew}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'white',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '8px',
                                    color: '#475569',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                첫 프로젝트 만들기
                            </button>
                        )}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleOpen(project)}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    height: '160px',
                                    backgroundColor: project.template?.thumbnailColor || '#e0e7ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#4f46e5',
                                    fontSize: '3rem'
                                }}>
                                    {project.template?.icon || '📝'}
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '4px 8px',
                                            backgroundColor: project.category === 'team' ? '#f0fdf4' : '#eff6ff',
                                            color: project.category === 'team' ? '#166534' : '#1e40af',
                                            borderRadius: '999px',
                                            fontWeight: '600'
                                        }}>
                                            {project.category === 'team' ? '팀' : '개인'}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                            {formatDate(project.updatedAt)}
                                        </span>
                                    </div>
                                    <h3 style={{
                                        margin: '0 0 8px 0',
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: '#1e293b',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                                        {project.author} · {project.type}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteTarget(project);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#ef4444',
                                        fontSize: '1.2rem',
                                        opacity: 0,
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                                    className="delete-btn"
                                >
                                    ×
                                </button>
                                <style>{`
                                    div:hover > .delete-btn {
                                        opacity: 1 !important;
                                    }
                                `}</style>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {deleteTarget && (
                <DeleteProjectDialog
                    project={deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default ProjectList;
