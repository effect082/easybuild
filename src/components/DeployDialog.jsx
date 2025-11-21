import React from 'react';

const DeployDialog = ({ url, onClose }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', color: '#333' }}>Deployment Successful!</h2>

                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Your content is now live. Share it with the world!
                </p>

                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px', wordBreak: 'break-all' }}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }}>
                        {url}
                    </a>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <img src={qrCodeUrl} alt="QR Code" style={{ width: '200px', height: '200px', border: '1px solid #eee', borderRadius: '8px' }} />
                </div>

                <button
                    onClick={onClose}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DeployDialog;
