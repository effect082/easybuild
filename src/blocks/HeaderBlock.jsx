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
            {content.description && (
                <div style={{
                    fontSize: '16px',
                    fontWeight: 'normal',
                    color: '#666',
                    marginTop: '10px',
                    lineHeight: '1.6'
                }}>
                    {content.description}
                </div>
            )}
        </div>
    );
};

export default HeaderBlock;
