import React, { useState, useEffect } from 'react';

const ImageEditor = ({ block, updateBlock }) => {
    const [imgError, setImgError] = useState(false);
    const [helperMessage, setHelperMessage] = useState('');

    const convertImgurUrl = (url) => {
        if (!url) return url;
        // Convert https://imgur.com/XXXXX to https://i.imgur.com/XXXXX.png
        // But ignore if it's already i.imgur.com or has an extension
        if (url.includes('imgur.com') && !url.includes('i.imgur.com') && !url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const id = url.split('/').pop();
            return `https://i.imgur.com/${id}.png`;
        }
        return url;
    };

    useEffect(() => {
        setImgError(false);
        const url = block.content.url;
        if (url) {
            if (url.includes('google.com/imgres')) {
                setHelperMessage('팁: 구글 검색 결과 페이지입니다. "이미지 주소 복사"를 사용하세요.');
            } else {
                setHelperMessage('');
            }
        } else {
            setHelperMessage('');
        }
    }, [block.content.url]);

    const handleUrlChange = (value) => {
        const convertedUrl = convertImgurUrl(value);
        updateBlock(block.id, { content: { ...block.content, url: convertedUrl } });
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
                        borderRadius: 'var(--radius-md)',
                        borderColor: imgError ? '#ef4444' : 'var(--border-color)'
                    }}
                />
                {helperMessage && (
                    <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        💡 {helperMessage}
                    </p>
                )}
            </div>

            {/* Image Preview */}
            {block.content.url && (
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        미리보기
                    </label>
                    <div style={{
                        border: `1px solid ${imgError ? '#ef4444' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)',
                        padding: '10px',
                        backgroundColor: '#f9fafb',
                        textAlign: 'center',
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        {!imgError ? (
                            <img
                                src={block.content.url}
                                alt="Preview"
                                onError={() => setImgError(true)}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '200px',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                        ) : (
                            <div style={{ color: '#ef4444' }}>
                                <p style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>⚠️</p>
                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>이미지를 불러올 수 없습니다</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>URL이 정확한지 확인해주세요.</p>
                            </div>
                        )}
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

