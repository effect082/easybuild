import React from 'react';

const DateBlock = ({ content, style }) => {
    const { title, scheduleItems = [] } = content;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        // Check if valid date
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ padding: '24px', backgroundColor: '#f8f9fa', borderRadius: '12px', textAlign: 'center', ...style }}>
            {title && <h3 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', color: '#1f2937' }}>{title}</h3>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scheduleItems.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <span style={{
                            color: '#6b7280',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            minWidth: '60px',
                            textAlign: 'left'
                        }}>
                            {item.label}
                        </span>
                        <span style={{
                            fontWeight: '600',
                            color: '#111827',
                            fontSize: '1rem',
                            textAlign: 'right'
                        }}>
                            {item.type === 'datetime' ? formatDate(item.value) : item.value}
                        </span>
                    </div>
                ))}

                {scheduleItems.length === 0 && (
                    <div style={{ color: '#9ca3af', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        일정 항목을 추가해주세요
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateBlock;
