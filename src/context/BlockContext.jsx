import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BlockContext = createContext();

const initialState = {
    blocks: [],
    selectedBlockId: null,
    currentProject: null,
};

const blockReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BLOCK':
            const newBlock = {
                id: uuidv4(),
                type: action.payload.type,
                content: action.payload.initialContent || {},
                styles: action.payload.initialStyles || {},
            };
            return {
                ...state,
                blocks: [...state.blocks, newBlock],
                selectedBlockId: newBlock.id,
            };
        case 'UPDATE_BLOCK':
            return {
                ...state,
                blocks: state.blocks.map((block) =>
                    block.id === action.payload.id
                        ? { ...block, ...action.payload.updates }
                        : block
                ),
            };
        case 'REMOVE_BLOCK':
            return {
                ...state,
                blocks: state.blocks.filter((block) => block.id !== action.payload.id),
                selectedBlockId: state.selectedBlockId === action.payload.id ? null : state.selectedBlockId,
            };
        case 'SELECT_BLOCK':
            return {
                ...state,
                selectedBlockId: action.payload.id,
            };
        case 'REORDER_BLOCKS':
            const { fromIndex, toIndex } = action.payload;
            const result = Array.from(state.blocks);
            const [removed] = result.splice(fromIndex, 1);
            result.splice(toIndex, 0, removed);
            return {
                ...state,
                blocks: result
            };
        case 'LOAD_TEMPLATE':
            return {
                ...state,
                blocks: action.payload.blocks,
                selectedBlockId: null,
            };
        case 'LOAD_PROJECT':
            return {
                ...state,
                blocks: action.payload.project.blocks || [],
                currentProject: action.payload.project,
                selectedBlockId: null,
            };
        case 'UPDATE_PROJECT_INFO':
            return {
                ...state,
                currentProject: state.currentProject ? {
                    ...state.currentProject,
                    ...action.payload
                } : null,
            };
        case 'CLEAR_PROJECT':
            return {
                ...state,
                blocks: [],
                currentProject: null,
                selectedBlockId: null,
            };
        default:
            return state;
    }
};

export const BlockProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blockReducer, initialState);

    const addBlock = (type, initialContent = {}, initialStyles = {}) => {
        dispatch({ type: 'ADD_BLOCK', payload: { type, initialContent, initialStyles } });
    };

    const updateBlock = (id, updates) => {
        dispatch({ type: 'UPDATE_BLOCK', payload: { id, updates } });
    };

    const removeBlock = (id) => {
        dispatch({ type: 'REMOVE_BLOCK', payload: { id } });
    };

    const selectBlock = (id) => {
        dispatch({ type: 'SELECT_BLOCK', payload: { id } });
    };

    const reorderBlocks = (fromIndex, toIndex) => {
        dispatch({ type: 'REORDER_BLOCKS', payload: { fromIndex, toIndex } });
    }

    const loadTemplate = (blocks) => {
        dispatch({ type: 'LOAD_TEMPLATE', payload: { blocks } });
    };

    const loadProject = (project) => {
        dispatch({ type: 'LOAD_PROJECT', payload: { project } });
    };

    const updateProjectInfo = (info) => {
        dispatch({ type: 'UPDATE_PROJECT_INFO', payload: info });
    };

    const clearProject = () => {
        dispatch({ type: 'CLEAR_PROJECT' });
    };

    const value = React.useMemo(() => ({
        state,
        addBlock,
        updateBlock,
        removeBlock,
        selectBlock,
        reorderBlocks,
        loadTemplate,
        loadProject,
        updateProjectInfo,
        clearProject
    }), [state]);

    return (
        <BlockContext.Provider value={value}>
            {children}
        </BlockContext.Provider>
    );
};

export const useBlocks = () => {
    const context = useContext(BlockContext);
    if (!context) {
        throw new Error('useBlocks must be used within a BlockProvider');
    }
    return context;
};
