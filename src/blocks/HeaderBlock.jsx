import React from 'react';

const HeaderBlock = ({ content, style }) => {
    return (
        <div style={{
            padding: '20px',
            fontSize: style?.fontSize || '32px',
            fontWeight: 'bold',
            textAlign: style?.textAlign || 'center',
            color: style?.color || '#000000',
            ...style
        }}>
            {content.text || '제목을 입력하세요'}
        </div>
    );
};

export default HeaderBlock;
