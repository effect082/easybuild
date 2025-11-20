import React from 'react';

const DateBlock = ({ content, style }) => {
    const { startDate, endDate, title } = content;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center', ...style }}>
            {title && <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {startDate ? new Date(startDate).toLocaleDateString() : 'Start Date'}
                </div>
                {endDate && (
                    <>
                        <div style={{ color: '#666' }}>~</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {new Date(endDate).toLocaleDateString()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DateBlock;
