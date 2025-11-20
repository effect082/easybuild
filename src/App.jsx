import React, { useState } from 'react';
import EditorLayout from './components/Layout/EditorLayout';
import BlockLibrary from './components/Editor/BlockLibrary';
import Canvas from './components/Editor/Canvas';
import PropertyPanel from './components/Editor/PropertyPanel';
import CreateProjectDialog from './components/CreateProjectDialog';
import ProjectList from './components/ProjectList';
import { useBlocks } from './context/BlockContext';
import { createProject, saveProject } from './utils/projectStorage';

function App() {
  const [showCreateProject, setShowCreateProject] = useState(true);
  const [showProjectList, setShowProjectList] = useState(false);
  const { state, loadProject, updateProjectInfo } = useBlocks();

  const handleCreateProject = (metadata) => {
    try {
      const newProject = createProject(metadata);
      loadProject(newProject);
      setShowCreateProject(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoadProject = (project) => {
    loadProject(project);
  };

  const handleSaveProject = () => {
    if (!state.currentProject) {
      alert('프로젝트가 생성되지 않았습니다.');
      return;
    }

    try {
      const updatedProject = {
        ...state.currentProject,
        blocks: state.blocks
      };
      saveProject(updatedProject);
      updateProjectInfo({ updatedAt: new Date().toISOString() });
      alert('프로젝트가 저장되었습니다!');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다: ' + err.message);
    }
  };

  if (showCreateProject) {
    return (
      <div>
        <CreateProjectDialog
          onClose={() => {/* Can't close on first time */ }}
          onCreate={handleCreateProject}
        />
        {state.currentProject && (
          <button
            onClick={() => setShowProjectList(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '12px 20px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 999
            }}
          >
            프로젝트 목록
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 0 }}>
      {showProjectList && (
        <ProjectList
          onClose={() => setShowProjectList(false)}
          onLoadProject={handleLoadProject}
        />
      )}

      {/* Top Bar with Project Info */}
      {state.currentProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '50px',
          backgroundColor: '#1e293b',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 100,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>
              {state.currentProject.title}
            </h1>
            <span style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {state.currentProject.type}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              by {state.currentProject.author}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowCreateProject(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              새 프로젝트
            </button>
            <button
              onClick={() => setShowProjectList(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              프로젝트 목록
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: state.currentProject ? '50px' : 0 }}>
        <EditorLayout
          leftPanel={<BlockLibrary />}
          centerPanel={<Canvas />}
          rightPanel={<PropertyPanel onSave={handleSaveProject} />}
        />
      </div>
    </div>
  );
}

export default App;
