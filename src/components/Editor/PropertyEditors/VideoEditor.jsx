import React from 'react';

const VideoEditor = ({ block, updateBlock }) => {
    const handleChange = (value) => {
        updateBlock(block.id, { content: { ...block.content, url: value } });
    };

    const handleDelete = () => {
        updateBlock(block.id, { content: { ...block.content, url: '' } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    Video URL (YouTube):
                </label>
                <input
                    type="text"
                    value={block.content.url || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    유튜브 URL을 입력하세요
                </p>
            </div>

            {/* Delete Button - only show if URL exists */}
            {block.content.url && (
                <button
                    onClick={handleDelete}
                    style={{
                        width: '100%',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                >
                    🗑️ 영상 삭제
                </button>
            )}
        </div>
    );
};

export default VideoEditor;

