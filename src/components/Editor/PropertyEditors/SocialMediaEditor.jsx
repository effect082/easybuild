import React from 'react';

const SocialMediaEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 플랫폼 선택 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    플랫폼
                </label>
                <select
                    value={block.content.platform || '유튜브'}
                    onChange={(e) => handleChange('platform', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                >
                    <option value="유튜브">유튜브</option>
                    <option value="네이버블로그">네이버블로그</option>
                    <option value="인스타그램">인스타그램</option>
                    <option value="카카오톡채널">카카오톡채널</option>
                </select>
            </div>

            {/* URL 입력 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    URL
                </label>
                <input
                    type="text"
                    value={block.content.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                    placeholder="https://"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>
                    소셜미디어 페이지 링크를 입력하세요
                </p>
            </div>
        </div>
    );
};

export default SocialMediaEditor;
