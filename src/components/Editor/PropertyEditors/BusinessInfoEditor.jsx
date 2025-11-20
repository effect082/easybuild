import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const BusinessInfoEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    const handleDetailChange = (detailId, key, value) => {
        const updatedDetails = (block.content.details || []).map(detail =>
            detail.id === detailId ? { ...detail, [key]: value } : detail
        );
        updateBlock(block.id, { content: { ...block.content, details: updatedDetails } });
    };

    const addDetail = () => {
        const newDetail = { id: uuidv4(), label: '이용 대상', value: '' };
        const updatedDetails = [...(block.content.details || []), newDetail];
        updateBlock(block.id, { content: { ...block.content, details: updatedDetails } });
    };

    const removeDetail = (detailId) => {
        const updatedDetails = (block.content.details || []).filter(detail => detail.id !== detailId);
        updateBlock(block.id, { content: { ...block.content, details: updatedDetails } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* 사업명 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    사업명
                </label>
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="예: 노인복지 프로그램"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* 사업 설명 */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    사업 설명
                </label>
                <textarea
                    value={block.content.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="사업에 대한 상세 설명을 입력하세요."
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        resize: 'vertical'
                    }}
                />
            </div>

            {/* 상세 항목 (이용 대상, 이용료 등) */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>상세 항목 (이용 대상, 이용료 등)</label>
                    <button
                        onClick={addDetail}
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                        }}
                    >
                        + 추가
                    </button>
                </div>

                {(block.content.details || []).map((detail, index) => (
                    <div key={detail.id} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px',
                        marginBottom: '10px',
                        backgroundColor: '#f9fafb'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>항목 {index + 1}</span>
                            <button
                                onClick={() => removeDetail(detail.id)}
                                style={{
                                    backgroundColor: '#fee2e2',
                                    color: '#dc2626',
                                    border: 'none',
                                    padding: '4px 8px',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                × 삭제
                            </button>
                        </div>
                        <input
                            type="text"
                            value={detail.label || ''}
                            onChange={(e) => handleDetailChange(detail.id, 'label', e.target.value)}
                            placeholder="항목명 (예: 이용 대상)"
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '6px'
                            }}
                        />
                        <input
                            type="text"
                            value={detail.value || ''}
                            onChange={(e) => handleDetailChange(detail.id, 'value', e.target.value)}
                            placeholder="내용 (예: 만 65세 이상)"
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>
                ))}

                {(!block.content.details || block.content.details.length === 0) && (
                    <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: 'var(--radius-md)' }}>
                        상세 항목이 없습니다. "+ 추가" 버튼을 클릭하여 항목을 추가하세요.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BusinessInfoEditor;
