import React from 'react';
import { useBlocks } from '../../context/BlockContext';
import BlockRegistry from '../../blocks/BlockRegistry';
import styles from './Canvas.module.css';

const Canvas = () => {
  const { state, selectBlock } = useBlocks();
  const { blocks, selectedBlockId, currentProject } = state;

  return (
    <div className={styles.canvasContainer} style={{ backgroundColor: currentProject?.styles?.backgroundColor || '#ffffff' }}>
      {/* Mobile Status Bar Mockup */}
      <div className={styles.statusBar}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <div style={{ padding: '0' }}>
        {blocks.length === 0 && (
          <div className={styles.emptyState}>
            <p>Your canvas is empty.</p>
            <p style={{ fontSize: '0.9rem' }}>Add blocks from the left panel to start creating.</p>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {blocks.map((block) => {
            const BlockComponent = BlockRegistry[block.type]?.view;
            if (!BlockComponent) return <div key={block.id}>Unknown Block Type: {block.type}</div>;

            const isSelected = selectedBlockId === block.id;

            return (
              <div
                key={block.id}
                onClick={() => selectBlock(block.id)}
                className={styles.blockWrapper}
                style={{
                  outline: isSelected ? '2px solid var(--primary-color)' : 'none',
                }}
              >
                <BlockComponent content={block.content} style={block.styles} />
                {isSelected && (
                  <div className={styles.selectedLabel}>
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
