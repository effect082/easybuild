import React from 'react';

const VideoBlock = ({ content, style }) => {
    return (
        <div style={{ padding: '10px', textAlign: 'center', ...style }}>
            {content.url ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={content.url.replace('watch?v=', 'embed/')}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div style={{ backgroundColor: '#eee', padding: '20px', color: '#888' }}>
                    No Video URL
                </div>
            )}
        </div>
    );
};

export default VideoBlock;
