import React from 'react';
import { templates } from '../../templates/templates';
import { useBlocks } from '../../context/BlockContext';

const TemplateSelector = ({ onClose }) => {
    const { loadTemplate } = useBlocks();

    const handleSelect = (template) => {
        // Deep copy blocks to ensure new IDs if needed, but for now just passing them
        // Ideally we should regenerate IDs here to avoid conflicts if we add multiple templates (though we replace here)
        loadTemplate(template.blocks);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '80%', maxWidth: '800px',
                maxHeight: '90vh', overflowY: 'auto'
            }}>
                <h2 style={{ marginTop: 0 }}>Select a Template</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    {templates.map((template) => (
                        <div key={template.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => handleSelect(template)}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                        >
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{template.name}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{template.description}</p>
                        </div>
                    ))}
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => handleSelect({ blocks: [] })}
                    >
                        <h3>Blank Canvas</h3>
                    </div>
                </div>
                <button onClick={onClose} style={{ marginTop: '2rem', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TemplateSelector;
