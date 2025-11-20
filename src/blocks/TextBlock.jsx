import React from 'react';

const TextBlock = ({ content, style }) => {
    return (
        <div style={{
            padding: '10px',
            fontSize: style?.fontSize || '16px',
            fontWeight: style?.fontWeight || 'normal',
            color: style?.color || 'inherit',
            textAlign: style?.textAlign || 'left',
            ...style
        }}>
            {content.text || 'Text Block'}
        </div>
    );
};

export default TextBlock;
