import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const DateEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    const handleAddItem = () => {
        const newItems = [
            ...(block.content.scheduleItems || []),
            { id: uuidv4(), label: '새 항목', value: '', type: 'datetime' }
        ];
        updateBlock(block.id, { content: { ...block.content, scheduleItems: newItems } });
    };

    const handleItemChange = (index, key, value) => {
        const newItems = [...(block.content.scheduleItems || [])];
        newItems[index] = { ...newItems[index], [key]: value };
        updateBlock(block.id, { content: { ...block.content, scheduleItems: newItems } });
    };

    const handleRemoveItem = (index) => {
        const newItems = [...(block.content.scheduleItems || [])];
        newItems.splice(index, 1);
        updateBlock(block.id, { content: { ...block.content, scheduleItems: newItems } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Title */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    일정 제목
                </label>
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="예: 결혼식, 돌잔치, 모임"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* Schedule Items */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    상세 항목
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(block.content.scheduleItems || []).map((item, index) => (
                        <div key={item.id || index} style={{
                            padding: '16px',
                            backgroundColor: '#f9fafb',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="라벨 (예: 일시)"
                                    value={item.label}
                                    onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '8px',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.9rem',
                                        fontWeight: '600'
                                    }}
                                />
                                <button
                                    onClick={() => handleRemoveItem(index)}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                        border: 'none',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        lineHeight: 1
                                    }}
                                    title="삭제"
                                >
                                    ×
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <input
                                        type="datetime-local"
                                        value={item.value}
                                        onChange={(e) => {
                                            handleItemChange(index, 'value', e.target.value);
                                            handleItemChange(index, 'type', 'datetime');
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.9rem',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                    <button
                                        onClick={() => alert('저장되었습니다.')}
                                        style={{
                                            padding: '10px 16px',
                                            backgroundColor: '#4f46e5',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        저장
                                    </button>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                                    * 날짜와 시간을 선택하고 저장 버튼을 눌러주세요
                                </span>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddItem}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'white',
                            border: '1px dashed var(--primary-color)',
                            color: 'var(--primary-color)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '600',
                            marginTop: '4px'
                        }}
                    >
                        + 항목 추가하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateEditor;
