import React, { useState, Suspense, useEffect } from 'react';
import EditorLayout from './components/Layout/EditorLayout';
import BlockLibrary from './components/Editor/BlockLibrary';
import Canvas from './components/Editor/Canvas';
import PropertyPanel from './components/Editor/PropertyPanel';
import { useBlocks } from './context/BlockContext';
import { createProject, saveProject, loadProject as loadProjectFromStorage } from './utils/projectStorage';

const CreateProjectDialog = React.lazy(() => import('./components/CreateProjectDialog'));
const ProjectList = React.lazy(() => import('./components/ProjectList'));
const DeployDialog = React.lazy(() => import('./components/DeployDialog'));

function App() {
  const [showCreateProject, setShowCreateProject] = useState(true);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const [viewMode, setViewMode] = useState(false);
  const { state, loadProject, updateProjectInfo } = useBlocks();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId) {
      const project = loadProjectFromStorage(projectId);
      if (project) {
        loadProject(project);
        setViewMode(true);
        setShowCreateProject(false);
      } else {
        alert('Project not found');
        // Remove query param if project not found
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

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
    setViewMode(false);
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

  const handleDeploy = () => {
    if (!state.currentProject) return;
    handleSaveProject(); // Auto-save before deploy
    const url = `${window.location.origin}${window.location.pathname}?project=${state.currentProject.id}`;
    setDeployUrl(url);
    setShowDeployDialog(true);
  };

  if (viewMode) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.1)', minHeight: '100vh' }}>
          <Canvas readOnly={true} />
        </div>
        <button
          onClick={() => {
            window.history.pushState({}, document.title, window.location.pathname);
            setViewMode(false);
            setShowCreateProject(true);
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}
        >
          Create Your Own
        </button>
      </div>
    );
  }

  if (showCreateProject) {
    return (
      <div>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
          <CreateProjectDialog
            onClose={() => {/* Can't close on first time */ }}
            onCreate={handleCreateProject}
          />
        </Suspense>
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
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} />}>
          <ProjectList
            onClose={() => setShowProjectList(false)}
            onLoadProject={handleLoadProject}
          />
        </Suspense>
      )}

      {showDeployDialog && (
        <Suspense fallback={<div />}>
          <DeployDialog
            url={deployUrl}
            onClose={() => setShowDeployDialog(false)}
          />
        </Suspense>
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
          rightPanel={<PropertyPanel onSave={handleSaveProject} onDeploy={handleDeploy} />}
        />
      </div>
    </div>
  );
}

export default App;
