import React from 'react';
import { useBlocks } from '../../context/BlockContext';
import BlockRegistry from '../../blocks/BlockRegistry';

const PropertyPanel = ({ onSave }) => {
    const { state, updateBlock, removeBlock, reorderBlocks } = useBlocks();
    const { blocks, selectedBlockId } = state;

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
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                        >
                            저장
                        </button>
                        <button
                            onClick={() => {/* Publish functionality */ }}
                            style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                        >
                            배포
                        </button>
                        <button
                            onClick={() => {/* Preview functionality */ }}
                            style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                            미리보기
                        </button>
                        <button
                            onClick={() => {/* Reset functionality */ }}
                            style={{ padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                        >
                            초기화
                        </button>
                    </div>
                </div>

                <div style={{ padding: '1rem', color: '#666' }}>
                    <h2>속성</h2>
                    <p>블록을 선택하여 속성을 편집하세요.</p>
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
            {/* Action Buttons */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '2px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>작업</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                        onClick={onSave}
                        style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                    >
                        저장
                    </button>
                    <button
                        onClick={() => {/* Publish functionality */ }}
                        style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                    >
                        배포
                    </button>
                    <button
                        onClick={() => {/* Preview functionality */ }}
                        style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                    >
                        미리보기
                    </button>
                    <button
                        onClick={() => {/* Reset functionality */ }}
                        style={{ padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                    >
                        초기화
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                    {BlockRegistry[selectedBlock.type]?.label || 'Block'} 속성
                </h2>
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
                        title="Move Up"
                    >
                        위로 이동
                    </button>
                    <button
                        onClick={handleMoveDown}
                        disabled={selectedIndex === blocks.length - 1}
                        style={{ flex: 1, padding: '8px', cursor: selectedIndex === blocks.length - 1 ? 'not-allowed' : 'pointer', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', opacity: selectedIndex === blocks.length - 1 ? 0.5 : 1 }}
                        title="Move Down"
                    >
                        아래로 이동
                    </button>
                </div>
                <button
                    onClick={() => removeBlock(selectedBlock.id)}
                    style={{ width: '100%', backgroundColor: '#fee2e2', color: 'var(--danger-color)', border: 'none', padding: '10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', transition: 'background-color 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                >
                    블록 삭제
                </button>
            </div>
        </div>
    );
};

export default PropertyPanel;
