import React from 'react';

const ImageEditor = ({ block, updateBlock }) => {
    const handleUrlChange = (value) => {
        updateBlock(block.id, { content: { ...block.content, url: value } });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                updateBlock(block.id, { content: { ...block.content, url: event.target.result } });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        updateBlock(block.id, { content: { ...block.content, url: '' } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* File Upload */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    이미지 업로드
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    컴퓨터나 스마트폰에서 이미지를 선택하세요
                </p>
            </div>

            {/* URL Input */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    또는 이미지 URL 입력
                </label>
                <input
                    type="text"
                    value={block.content.url || ''}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* Image Preview */}
            {block.content.url && (
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        미리보기
                    </label>
                    <div style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px',
                        backgroundColor: '#f9fafb',
                        textAlign: 'center'
                    }}>
                        <img
                            src={block.content.url}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>
                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        style={{
                            width: '100%',
                            marginTop: '10px',
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
                        🗑️ 이미지 삭제
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageEditor;

