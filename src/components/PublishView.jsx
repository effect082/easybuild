import React from 'react';
import BlockRegistry from '../blocks/BlockRegistry';

const PublishView = ({ blocks, onClose }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'white', zIndex: 2000, overflowY: 'auto'
        }}>
            <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
                    <span style={{ fontWeight: 'bold' }}>Preview / Published View</span>
                    <button onClick={onClose} style={{ padding: '5px 10px', cursor: 'pointer' }}>Close</button>
                </div>
                <div style={{ padding: '20px 0' }}>
                    {blocks.map((block) => {
                        const BlockComponent = BlockRegistry[block.type]?.view;
                        if (!BlockComponent) return null;
                        return (
                            <div key={block.id} style={{ marginBottom: '10px' }}>
                                <BlockComponent content={block.content} style={block.styles} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PublishView;
