import React from 'react';

const SocialMediaBlock = ({ content, style }) => {
    const platformIcons = {
        '유튜브': '▶️',
        '네이버블로그': '📝',
        '인스타그램': '📷',
        '카카오톡채널': '💬'
    };

    const platformColors = {
        '유튜브': '#FF0000',
        '네이버블로그': '#00C73C',
        '인스타그램': '#E4405F',
        '카카오톡채널': '#FFE812'
    };

    const platform = content.platform || '유튜브';
    const icon = platformIcons[platform] || '🔗';
    const color = platformColors[platform] || '#4f46e5';

    return (
        <div style={{ padding: '15px', ...style }}>
            {content.url ? (
                <a
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: color,
                        color: platform === '카카오톡채널' ? '#000' : '#fff',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'transform 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                    <span>{platform}</span>
                </a>
            ) : (
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    {icon} {platform} - URL을 입력하세요
                </div>
            )}
        </div>
    );
};

export default SocialMediaBlock;
