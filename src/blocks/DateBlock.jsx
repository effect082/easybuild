import React from 'react';

const DateBlock = ({ content, style }) => {
    const { startDate, endDate, title, customFields = [] } = content;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center', ...style }}>
            {title && <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>{title}</h3>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: customFields.length > 0 ? '15px' : '0' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                    {startDate ? formatDate(startDate) : 'Start Date'}
                </div>
                {endDate && (
                    <>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>↓</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                            {formatDate(endDate)}
                        </div>
                    </>
                )}
            </div>

            {customFields.length > 0 && (
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {customFields.map((field, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                            <span style={{ color: '#666', fontWeight: '500' }}>{field.label}</span>
                            <span style={{ fontWeight: '600' }}>{field.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DateBlock;
