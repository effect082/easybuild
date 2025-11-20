import React from 'react';

const MapBlock = ({ content, style }) => {
    return (
        <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#eee', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
            {content.address ? (
                <div>
                    <p>Map Placeholder for:</p>
                    <strong>{content.address}</strong>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>(Map integration requires API Key)</p>
                </div>
            ) : (
                <div style={{ color: '#888' }}>
                    No Address Set
                </div>
            )}
        </div>
    );
};

export default MapBlock;
