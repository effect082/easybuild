import React from 'react';

const InputBlock = ({ content, style }) => {
    return (
        <div style={{ padding: '20px', ...style }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem' }}>{content.label || 'Input Form'}</h4>

            {/* Render dynamic fields */}
            {(content.fields && content.fields.length > 0) ? (
                content.fields.map((field) => (
                    <div key={field.id} style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', fontWeight: '500' }}>
                            {field.label || 'Field'}
                        </label>
                        <input
                            type="text"
                            placeholder={field.placeholder || 'Enter text...'}
                            disabled
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                ))
            ) : (
                <input
                    type="text"
                    placeholder={content.placeholder || 'Enter text...'}
                    disabled
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '12px' }}
                />
            )}

            <button style={{ marginTop: '10px', width: '100%', padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500' }}>
                {content.buttonText || 'Submit'}
            </button>
        </div>
    );
};

export default InputBlock;

