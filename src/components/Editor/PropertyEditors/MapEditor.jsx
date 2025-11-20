import React from 'react';

const MapEditor = ({ block, updateBlock }) => {
    const handleChange = (value) => {
        updateBlock(block.id, { content: { ...block.content, address: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
                Address:
                <input
                    type="text"
                    value={block.content.address || ''}
                    onChange={(e) => handleChange(e.target.value)}
                    style={{ width: '100%' }}
                    placeholder="Enter address"
                />
            </label>
        </div>
    );
};

export default MapEditor;
