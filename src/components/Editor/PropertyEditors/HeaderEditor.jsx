import React from 'react';

const HeaderEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    const handleStyleChange = (key, value) => {
        updateBlock(block.id, { styles: { ...block.styles, [key]: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 제목 텍스트 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    제목
                </label>
                <input
                    type="text"
                    value={block.content.text || ''}
                    onChange={(e) => handleChange('text', e.target.value)}
                    placeholder="제목을 입력하세요"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* 설명 텍스트 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    설명
                </label>
                <textarea
                    value={block.content.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="예: 강동어울림복지관에서는 열정있는 사회복지사를 모집합니다"
                    rows="3"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '0.95rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    이 설명은 소셜 미디어 공유 시 미리보기로 표시됩니다
                </p>
            </div>

            {/* 폰트 크기 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    폰트 크기
                </label>
                <select
                    value={block.styles?.fontSize || '32px'}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                >
                    <option value="24px">작게 (24px)</option>
                    <option value="32px">보통 (32px)</option>
                    <option value="40px">크게 (40px)</option>
                    <option value="48px">매우 크게 (48px)</option>
                </select>
            </div>

            {/* 정렬 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    정렬
                </label>
                <select
                    value={block.styles?.textAlign || 'center'}
                    onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                >
                    <option value="left">왼쪽</option>
                    <option value="center">중앙</option>
                    <option value="right">오른쪽</option>
                </select>
            </div>

            {/* 색상 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    텍스트 색상
                </label>
                <input
                    type="color"
                    value={block.styles?.color || '#000000'}
                    onChange={(e) => handleStyleChange('color', e.target.value)}
                    style={{
                        width: '100%',
                        height: '40px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}
                />
            </div>
        </div>
    );
};

export default HeaderEditor;
