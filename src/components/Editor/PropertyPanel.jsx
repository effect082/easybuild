import React from 'react';
import { useBlocks } from '../../context/BlockContext';
import BlockRegistry from '../../blocks/BlockRegistry';

const PropertyPanel = ({ onSave, onDeploy }) => {
    const { state, updateBlock, removeBlock, reorderBlocks, updateProjectInfo } = useBlocks();
    const { blocks, selectedBlockId, currentProject } = state;

    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const selectedIndex = blocks.findIndex((b) => b.id === selectedBlockId);

    if (!selectedBlock) {
        return (
            <div>
                {/* Action Buttons */}
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '2px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>작업</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <button
                            onClick={onSave}
                            style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        >
                            저장
                        </button>
                        <button
                            onClick={onDeploy}
                            style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        >
                            배포
                        </button>
                        {/* ... other buttons ... */}
                    </div>
                </div>

                <div style={{ padding: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>프로젝트 설정</h2>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                            배경 색상
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="color"
                                value={currentProject?.styles?.backgroundColor || '#ffffff'}
                                onChange={(e) => updateProjectInfo({ styles: { ...currentProject.styles, backgroundColor: e.target.value } })}
                                style={{ width: '50px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {currentProject?.styles?.backgroundColor || '#ffffff'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const EditorComponent = BlockRegistry[selectedBlock.type]?.editor;

    const handleMoveUp = () => {
        if (selectedIndex > 0) {
            reorderBlocks(selectedIndex, selectedIndex - 1);
        }
    };

    const handleMoveDown = () => {
        if (selectedIndex < blocks.length - 1) {
            reorderBlocks(selectedIndex, selectedIndex + 1);
        }
    };

    return (
        <div>
            {/* Action Buttons (Same as above) */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '2px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>작업</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button onClick={onSave} style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>저장</button>
                    <button onClick={onDeploy} style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>배포</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                    {BlockRegistry[selectedBlock.type]?.label || 'Block'} 속성
                </h2>
            </div>

            {/* Common Block Styles */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                    블록 배경 색상
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="color"
                        value={selectedBlock.styles?.backgroundColor || '#ffffff'} // Default to transparent/white if not set, but input color needs hex
                        onChange={(e) => updateBlock(selectedBlock.id, { styles: { ...selectedBlock.styles, backgroundColor: e.target.value } })}
                        style={{ width: '50px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <button
                        onClick={() => updateBlock(selectedBlock.id, { styles: { ...selectedBlock.styles, backgroundColor: 'transparent' } })}
                        style={{ padding: '5px 10px', fontSize: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
                    >
                        투명
                    </button>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                {EditorComponent ? (
                    <EditorComponent block={selectedBlock} updateBlock={updateBlock} />
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No editor available for this block type.</p>
                )}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '1rem' }}>블록 관리</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button
                        onClick={handleMoveUp}
                        disabled={selectedIndex === 0}
                        style={{ flex: 1, padding: '8px', cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', opacity: selectedIndex === 0 ? 0.5 : 1 }}
                    >
                        위로 이동
                    </button>
                    <button
                        onClick={handleMoveDown}
                        disabled={selectedIndex === blocks.length - 1}
                        style={{ flex: 1, padding: '8px', cursor: selectedIndex === blocks.length - 1 ? 'not-allowed' : 'pointer', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', opacity: selectedIndex === blocks.length - 1 ? 0.5 : 1 }}
                    >
                        아래로 이동
                    </button>
                </div>
                <button
                    onClick={() => removeBlock(selectedBlock.id)}
                    style={{ width: '100%', backgroundColor: '#fee2e2', color: 'var(--danger-color)', border: 'none', padding: '10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500' }}
                >
                    블록 삭제
                </button>
            </div>
        </div>
    );
};

export default PropertyPanel;
