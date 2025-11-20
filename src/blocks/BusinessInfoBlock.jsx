import React from 'react';

const BusinessInfoBlock = ({ content, style }) => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderLeft: '4px solid #3b82f6', ...style }}>
            {/* 사업명 */}
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#1e40af' }}>
                {content.title || '사업 안내'}
            </h3>

            {/* 사업 설명 */}
            {content.description && (
                <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#374151' }}>
                    {content.description}
                </p>
            )}

            {/* 상세 항목 */}
            {content.details && content.details.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                    {content.details.map((detail) => (
                        <div key={detail.id} style={{
                            display: 'flex',
                            marginBottom: '8px',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{
                                fontWeight: '600',
                                minWidth: '100px',
                                color: '#1f2937'
                            }}>
                                {detail.label || '항목'}:
                            </span>
                            <span style={{ color: '#4b5563' }}>
                                {detail.value || '-'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BusinessInfoBlock;
