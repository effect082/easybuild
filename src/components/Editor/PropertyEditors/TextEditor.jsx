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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
                Text Content:
                <textarea
                    value={block.content.text || ''}
                    onChange={(e) => handleChange('text', e.target.value)}
                    style={{ width: '100%', minHeight: '80px' }}
                />
            </label>
            <label>
                Font Size:
                <input
                    type="text"
                    value={block.styles.fontSize || '16px'}
                    onChange={(e) => handleChange('fontSize', e.target.value)}
                />
            </label>
            <label>
                Color:
                <input
                    type="color"
                    value={block.styles.color || '#000000'}
                    onChange={(e) => handleChange('color', e.target.value)}
                />
            </label>
            <label>
                Alignment:
                <select
                    value={block.styles.textAlign || 'left'}
                    onChange={(e) => handleChange('textAlign', e.target.value)}
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                </select>
            </label>
        </div>
    );
};

export default TextEditor;
