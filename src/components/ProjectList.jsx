import React, { useState } from 'react';
import { getAllProjects, deleteProject } from '../utils/projectStorage';
import DeleteProjectDialog from './DeleteProjectDialog';

const ProjectList = ({ onClose, onLoadProject }) => {
    const [projects, setProjects] = useState(getAllProjects());
    const [deleteTarget, setDeleteTarget] = useState(null);

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

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                overflow: 'auto',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    width: '90%',
                    maxWidth: '800px',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                            프로젝트 목록
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            닫기
                        </button>
                    </div>

                    {projects.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#666'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>저장된 프로젝트가 없습니다.</p>
                            <p style={{ fontSize: '0.9rem', margin: '8px 0 0 0', color: '#999' }}>
                                새 프로젝트를 만들어보세요!
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    style={{
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        padding: '20px',
                                        backgroundColor: '#f9fafb',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ marginBottom: '12px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700' }}>
                                            {project.title}
                                        </h3>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                backgroundColor: '#eff6ff',
                                                color: '#3b82f6',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {project.type}
                                            </span>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                backgroundColor: '#f0fdf4',
                                                color: '#10b981',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {project.author}
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: '#666' }}>
                                        <div>블록 {project.blocks?.length || 0}개</div>
                                        <div>생성: {formatDate(project.createdAt)}</div>
                                        {project.updatedAt !== project.createdAt && (
                                            <div>수정: {formatDate(project.updatedAt)}</div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleOpen(project)}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                backgroundColor: '#4f46e5',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            열기
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeleteTarget(project);
                                            }}
                                            style={{
                                                padding: '10px',
                                                backgroundColor: '#fee2e2',
                                                color: '#dc2626',
                                                border: 'none',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
