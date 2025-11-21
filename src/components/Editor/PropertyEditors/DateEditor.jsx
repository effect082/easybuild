import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ScheduleItem = ({ item, index, onChange, onRemove }) => {
    const [label, setLabel] = useState(item.label);
    const [value, setValue] = useState(item.value);

    useEffect(() => {
        setLabel(item.label);
        setValue(item.value);
    }, [item.label, item.value]);

    const handleBlur = () => {
        if (label !== item.label || value !== item.value) {
            onChange(index, { label, value, type: 'datetime' });
        }
    };

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="라벨 (예: 일시)"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
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
                    onClick={() => onRemove(index)}
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
                <input
                    type="text"
                    value={value}
                    placeholder="YYYY-MM-DD HH:mm (예: 2025-11-21 14:00)"
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontFamily: 'inherit'
                    }}
                />
                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    * 날짜와 시간을 직접 입력해주세요 (자동 저장됨)
                </span>
            </div>
        </div>
    );
};

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

    const handleItemUpdate = (index, newItem) => {
        const newItems = [...(block.content.scheduleItems || [])];
        newItems[index] = { ...newItems[index], ...newItem };
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
                        <ScheduleItem
                            key={item.id || index}
                            item={item}
                            index={index}
                            onChange={handleItemUpdate}
                            onRemove={handleRemoveItem}
                        />
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
