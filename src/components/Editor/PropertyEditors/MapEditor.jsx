import React from 'react';

const MapEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}>
                Place Name:
                <input
                    type="text"
                    value={block.content.placeName || ''}
                    onChange={(e) => handleChange('placeName', e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="e.g., Central Park"
                />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}>
                Address:
                <input
                    type="text"
                    value={block.content.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="e.g., 123 Main St, New York, NY"
                />
            </label>
        </div>
    );
};

export default MapEditor;
