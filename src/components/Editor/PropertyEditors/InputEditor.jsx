import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const InputEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    const handleFieldChange = (fieldId, key, value) => {
        const updatedFields = (block.content.fields || []).map(field =>
            field.id === fieldId ? { ...field, [key]: value } : field
        );
        updateBlock(block.id, { content: { ...block.content, fields: updatedFields } });
    };

    const addField = () => {
        const newField = { id: uuidv4(), label: '입력 필드', placeholder: '내용을 입력하세요' };
        const updatedFields = [...(block.content.fields || []), newField];
        updateBlock(block.id, { content: { ...block.content, fields: updatedFields } });
    };

    const removeField = (fieldId) => {
        const updatedFields = (block.content.fields || []).filter(field => field.id !== fieldId);
        updateBlock(block.id, { content: { ...block.content, fields: updatedFields } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Form Title */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    폼 제목
                </label>
                <input
                    type="text"
                    value={block.content.label || ''}
                    onChange={(e) => handleChange('label', e.target.value)}
                    placeholder="예: 연락처 입력"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* Button Text */}
            <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                    버튼 텍스트
                </label>
                <input
                    type="text"
                    value={block.content.buttonText || ''}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                    placeholder="예: 제출"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                    }}
                />
            </div>

            {/* Dynamic Fields */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>입력 필드</label>
                    <button
                        onClick={addField}
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

                {(block.content.fields || []).map((field, index) => (
                    <div key={field.id} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px',
                        marginBottom: '10px',
                        backgroundColor: '#f9fafb'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>필드 {index + 1}</span>
                            <button
                                onClick={() => removeField(field.id)}
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
                            value={field.label || ''}
                            onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
                            placeholder="필드 레이블"
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
                            value={field.placeholder || ''}
                            onChange={(e) => handleFieldChange(field.id, 'placeholder', e.target.value)}
                            placeholder="플레이스홀더"
                            style={{
                                width: '100%',
                                padding: '6px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>
                ))}

                {(!block.content.fields || block.content.fields.length === 0) && (
                    <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', padding: '20px', backgroundColor: '#f9fafb', borderRadius: 'var(--radius-md)' }}>
                        입력 필드가 없습니다. "+ 추가" 버튼을 클릭하여 필드를 추가하세요.
                    </p>
                )}
            </div>
        </div>
    );
};

export default InputEditor;

