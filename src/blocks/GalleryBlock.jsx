import React from 'react';

const GalleryBlock = ({ content, style }) => {
    const images = content.images || [];

    if (images.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb', ...style }}>
                <p style={{ color: '#888' }}>갤러리 이미지를 추가해주세요</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '10px', ...style }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '10px'
            }}>
                {images.map((image, index) => {
                    const imageElement = (
                        <img
                            key={index}
                            src={image.url}
                            alt={`Gallery ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                display: 'block'
                            }}
                        />
                    );

                    return image.link ? (
                        <a
                            key={index}
                            href={image.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'block' }}
                        >
                            {imageElement}
                        </a>
                    ) : (
                        imageElement
                    );
                })}
            </div>
        </div>
    );
};

export default GalleryBlock;
