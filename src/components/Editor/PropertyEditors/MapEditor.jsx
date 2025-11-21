import React from 'react';

const MapEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 장소명 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    장소명
                </label>
                <input
                    type="text"
                    value={block.content.placeName || ''}
                    onChange={(e) => handleChange('placeName', e.target.value)}
                    placeholder="예: 중앙공원"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* 주소 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    주소
                </label>
                <input
                    type="text"
                    value={block.content.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="예: 서울시 강남구 테헤란로 123"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>
        </div>
    );
};

export default MapEditor;
