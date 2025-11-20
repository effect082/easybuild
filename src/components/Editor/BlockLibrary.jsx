import React from 'react';
import { useBlocks } from '../../context/BlockContext';

const BlockLibrary = () => {
    const { addBlock } = useBlocks();

    const handleAddBlock = (type) => {
        addBlock(type, { text: 'New Block' });
    };

    const BlockButton = ({ type, label }) => (
        <button
            onClick={() => handleAddBlock(type)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)',
                width: '100%',
                textAlign: 'left'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>블록 라이브러리</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>블록을 클릭하여 페이지에 추가하세요</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <BlockButton type="header" label="헤드(제목)" />
                <BlockButton type="text" label="텍스트" />
                <BlockButton type="image" label="이미지" />
                <BlockButton type="video" label="영상" />
                <BlockButton type="businessInfo" label="사업안내" />
                <BlockButton type="date" label="일정" />
                <BlockButton type="map" label="지도" />
                <BlockButton type="input" label="입력폼" />
                <BlockButton type="socialMedia" label="소셜미디어" />
            </div>
        </div>
    );
};

export default BlockLibrary;
