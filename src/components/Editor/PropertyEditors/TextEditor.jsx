import React from 'react';

const TextEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        if (key === 'text') {
            updateBlock(block.id, { content: { ...block.content, text: value } });
        } else {
            updateBlock(block.id, { styles: { ...block.styles, [key]: value } });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 텍스트 내용 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    텍스트 내용
                </label>
                <textarea
                    value={block.content.text || ''}
                    onChange={(e) => handleChange('text', e.target.value)}
                    placeholder="내용을 입력하세요"
                    rows="5"
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
            </div>

            {/* 폰트 크기 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    폰트 크기
                </label>
                <input
                    type="text"
                    value={block.styles.fontSize || '16px'}
                    onChange={(e) => handleChange('fontSize', e.target.value)}
                    placeholder="16px"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* 색상 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    색상
                </label>
                <input
                    type="color"
                    value={block.styles.color || '#000000'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    style={{
                        width: '100%',
                        height: '40px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}
                />
            </div>

            {/* 정렬 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    정렬
                </label>
                <select
                    value={block.styles.textAlign || 'left'}
                    onChange={(e) => handleChange('textAlign', e.target.value)}
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
        </div>
    );
};

export default TextEditor;
