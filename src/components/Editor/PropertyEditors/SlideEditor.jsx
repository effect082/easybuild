import React, { useState } from 'react';

const SlideEditor = ({ block, updateBlock }) => {
    const slides = block.content.slides || [];

    const addSlide = () => {
        const newSlides = [...slides, { url: '', link: '' }];
        updateBlock(block.id, { content: { ...block.content, slides: newSlides } });
    };

    const removeSlide = (index) => {
        const newSlides = slides.filter((_, i) => i !== index);
        updateBlock(block.id, { content: { ...block.content, slides: newSlides } });
    };

    const updateSlide = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        updateBlock(block.id, { content: { ...block.content, slides: newSlides } });
    };

    const handleFileUpload = (index, e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                updateSlide(index, 'url', event.target.result);
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
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: '600' }}>슬라이드 관리</h3>

                {/* Interval Configuration */}
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                        슬라이드 전환 간격 (초)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="7"
                        step="0.1"
                        value={block.content.interval || 3}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 1 && value <= 7) {
                                updateBlock(block.id, { content: { ...block.content, interval: value } });
                            }
                        }}
                        placeholder="3"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.85rem'
                        }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                        슬라이드 자동 전환 속도 (1초 ~ 7초, 소수점 가능: 1.5, 2.5 등)
                    </p>
                </div>

                <button
                    onClick={addSlide}
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
                    + 슬라이드 추가
                </button>
            </div>

            {slides.length === 0 && (
                <p style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>
                    슬라이드를 추가해주세요
                </p>
            )}

            {slides.map((slide, index) => (
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
                            슬라이드 {index + 1}
                        </h4>
                        <button
                            onClick={() => removeSlide(index)}
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
                            value={slide.url}
                            onChange={(e) => updateSlide(index, 'url', convertImgurUrl(e.target.value))}
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
                            value={slide.link || ''}
                            onChange={(e) => updateSlide(index, 'link', e.target.value)}
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
                    {slide.url && (
                        <div style={{ marginTop: '12px' }}>
                            <img
                                src={slide.url}
                                alt={`Slide ${index + 1} preview`}
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

export default SlideEditor;
