import React from 'react';

const DateEditor = ({ block, updateBlock }) => {
    const handleChange = (key, value) => {
        updateBlock(block.id, { content: { ...block.content, [key]: value } });
    };

    const handleAddCustomField = () => {
        const newFields = [...(block.content.customFields || []), { label: '', value: '' }];
        updateBlock(block.id, { content: { ...block.content, customFields: newFields } });
    };

    const handleCustomFieldChange = (index, key, value) => {
        const newFields = [...(block.content.customFields || [])];
        newFields[index] = { ...newFields[index], [key]: value };
        updateBlock(block.id, { content: { ...block.content, customFields: newFields } });
    };

    const handleRemoveCustomField = (index) => {
        const newFields = [...(block.content.customFields || [])];
        newFields.splice(index, 1);
        updateBlock(block.id, { content: { ...block.content, customFields: newFields } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}>
                Event Title:
                <input
                    type="text"
                    value={block.content.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    placeholder="e.g., Wedding Ceremony"
                />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}>
                Start Date & Time:
                <input
                    type="datetime-local"
                    value={block.content.startDate || ''}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}>
                End Date & Time:
                <input
                    type="datetime-local"
                    value={block.content.endDate || ''}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </label>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: '600' }}>Custom Fields</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(block.content.customFields || []).map((field, index) => (
                        <div key={index} style={{ display: 'flex', gap: '5px' }}>
                            <input
                                type="text"
                                placeholder="Label"
                                value={field.label}
                                onChange={(e) => handleCustomFieldChange(index, 'label', e.target.value)}
                                style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem' }}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={field.value}
                                onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                                style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem' }}
                            />
                            <button
                                onClick={() => handleRemoveCustomField(index)}
                                style={{ padding: '0 8px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddCustomField}
                        style={{ padding: '8px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px dashed #d1d5db', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginTop: '5px' }}
                    >
                        + Add Field
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateEditor;
