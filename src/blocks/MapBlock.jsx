import React from 'react';

const MapBlock = ({ content, style }) => {
    const { placeName, address } = content;

    const handleOpenMap = (type) => {
        if (!address) return;
        const query = encodeURIComponent(address);
        let url = '';
        if (type === 'naver') {
            url = `https://map.naver.com/v5/search/${query}`;
        } else if (type === 'kakao') {
            url = `https://map.kakao.com/link/search/${query}`;
        }
        window.open(url, '_blank');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px', ...style }}>
            <div style={{ marginBottom: '15px' }}>
                {placeName && <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{placeName}</h3>}
                {address ? (
                    <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{address}</p>
                ) : (
                    <p style={{ color: '#999' }}>주소를 입력해주세요.</p>
                )}
            </div>

            {address && (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                        onClick={() => handleOpenMap('naver')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#03C75A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        📍 네이버지도
                    </button>
                    <button
                        onClick={() => handleOpenMap('kakao')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#FEE500',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        📍 카카오맵
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapBlock;
