import React from 'react';

const GalleryEditor = ({ block, updateBlock }) => {
    const images = block.content.images || [];

    const addImage = () => {
        const newImages = [...images, { url: '', link: '' }];
        updateBlock(block.id, { content: { ...block.content, images: newImages } });
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        updateBlock(block.id, { content: { ...block.content, images: newImages } });
    };

    const updateImage = (index, field, value) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: value };
        updateBlock(block.id, { content: { ...block.content, images: newImages } });
    };

    const handleFileUpload = (index, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                updateImage(index, 'url', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertImgurUrl = (url) => {
        if (!url) return url;
        if (url.includes('imgur.com') && !url.includes('i.imgur.com') && !url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const id = url.split('/').pop();
            return `https://i.imgur.com/${id}.png`;
        }
        return url;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: '600' }}>갤러리 이미지 관리</h3>
                <button
                    onClick={addImage}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    + 이미지 추가
                </button>
            </div>

            {images.length === 0 && (
                <p style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
                    이미지를 추가해주세요
                </p>
            )}

            {images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>
                            이미지 {index + 1}
                        </h4>
                        <button
                            onClick={() => removeImage(index)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}
                        >
                            삭제
                        </button>
                    </div>

                    {/* File Upload */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                            이미지 업로드
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(index, e)}
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem'
                            }}
                        />
                    </div>

                    {/* URL Input */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                            이미지 URL
                        </label>
                        <input
                            type="text"
                            value={image.url}
                            onChange={(e) => updateImage(index, 'url', convertImgurUrl(e.target.value))}
                            placeholder="https://example.com/image.jpg"
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem'
                            }}
                        />
                    </div>

                    {/* Link URL Input */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                            링크 URL (선택사항)
                        </label>
                        <input
                            type="text"
                            value={image.link || ''}
                            onChange={(e) => updateImage(index, 'link', e.target.value)}
                            placeholder="https://example.com (클릭 시 이동)"
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.85rem'
                            }}
                        />
                    </div>

                    {/* Preview */}
                    {image.url && (
                        <div style={{ marginTop: '12px' }}>
                            <img
                                src={image.url}
                                alt={`Gallery ${index + 1} preview`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '120px',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'block'
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GalleryEditor;
