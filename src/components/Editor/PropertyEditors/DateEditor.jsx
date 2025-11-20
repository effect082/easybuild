import React from 'react';

const DateEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
                Event Title:
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    style={{ width: '100%' }}
                />
            </label>
            <label>
                Start Date:
                <input
                    type="date"
                    value={block.content.startDate || ''}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    style={{ width: '100%' }}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={block.content.endDate || ''}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    style={{ width: '100%' }}
                />
            </label>
        </div>
    );
};

export default DateEditor;
