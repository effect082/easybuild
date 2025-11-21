import React from 'react';

const ImageBlock = ({ content, style }) => {
    const imageElement = content.url ? (
        <img src={content.url} alt="Block content" style={{ maxWidth: '100%', height: 'auto' }} />
    ) : (
        <div style={{ backgroundColor: '#eee', padding: '20px', color: '#888' }}>
            No Image Selected
        </div>
    );

    return (
        <div style={{ padding: '10px', textAlign: 'center', ...style }}>
            {content.link ? (
                <a href={content.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                    {imageElement}
                </a>
            ) : (
                imageElement
            )}
        </div>
    );
};

export default ImageBlock;
