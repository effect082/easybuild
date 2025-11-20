import React from 'react';

const ImageBlock = ({ content, style }) => {
    return (
        <div style={{ padding: '10px', textAlign: 'center', ...style }}>
            {content.url ? (
                <img src={content.url} alt="Block content" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
                <div style={{ backgroundColor: '#eee', padding: '20px', color: '#888' }}>
                    No Image Selected
                </div>
            )}
        </div>
    );
};

export default ImageBlock;
