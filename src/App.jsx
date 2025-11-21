
import React, { useState, Suspense, useEffect } from 'react';
import EditorLayout from './components/Layout/EditorLayout';
import BlockLibrary from './components/Editor/BlockLibrary';
import Canvas from './components/Editor/Canvas';
import PropertyPanel from './components/Editor/PropertyPanel';
import { useBlocks } from './context/BlockContext';
import { createProject, saveProject, loadProject as loadProjectFromStorage } from './utils/projectStorage';
import { decodeProjectFromUrl } from './utils/urlSharing';
import { updateMetaTags } from './utils/metaTags';

const CreateProjectDialog = React.lazy(() => import('./components/CreateProjectDialog'));
const ProjectList = React.lazy(() => import('./components/ProjectList'));
const DeployDialog = React.lazy(() => import('./components/DeployDialog'));

function App() {
  // Views: 'create', 'list', 'editor', 'view_only'
  const [currentView, setCurrentView] = useState('list');
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const { state, loadProject, updateProjectInfo } = useBlocks();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    const encodedData = params.get('data');

    if (encodedData) {
      // New URL-based sharing
      decodeProjectFromUrl(encodedData)
        .then(project => {
          loadProject(project);
          updateMetaTags(project);
          setCurrentView('view_only');
        })
        .catch(error => {
          alert('프로젝트를 불러올 수 없습니다: ' + error.message);
          window.history.replaceState({}, document.title, window.location.pathname);
          setCurrentView('list');
        });
    } else if (projectId) {
      // Legacy localStorage-based loading
      const project = loadProjectFromStorage(projectId);
      if (project) {
        loadProject(project);
        updateMetaTags(project);
        setCurrentView('view_only');
      } else {
        alert('Project not found');
        window.history.replaceState({}, document.title, window.location.pathname);
        setCurrentView('list');
      }
    } else {
      // Default to list view if no project param
      setCurrentView('list');
    }
  }, []);

  const handleCreateProject = (metadata) => {
    try {
      const newProject = createProject(metadata);
      loadProject(newProject);
      setCurrentView('editor');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLoadProject = (project) => {
    loadProject(project);
    setCurrentView('editor');
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

  const handleDeploy = async () => {
    if (!state.currentProject) return;
    handleSaveProject(); // Auto-save before deploy

    try {
      const { encodeProjectForUrl } = await import('./utils/urlSharing');
      const encodedData = await encodeProjectForUrl(state.currentProject);
      const url = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      setDeployUrl(url);
      setShowDeployDialog(true);
    } catch (error) {
      alert('프로젝트 배포 URL 생성에 실패했습니다: ' + error.message);
    }
  };

  const handleCancelCreate = () => {
    setCurrentView('list');
  };

  if (currentView === 'view_only') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'white', boxShadow: '0 0 20px rgba(0,0,0,0.1)', minHeight: '100vh' }}>
          <Canvas readOnly={true} />
        </div>
        <button
          onClick={() => {
            window.history.pushState({}, document.title, window.location.pathname);
            setCurrentView('list');
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

  return (
    <div style={{ padding: 0 }}>
      {currentView === 'list' && (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
          <ProjectList
            onClose={() => {/* ProjectList is now main view, no close needed usually, but kept for prop compat if needed */ }}
            onLoadProject={handleLoadProject}
            onCreateNew={() => setCurrentView('create')}
          />
        </Suspense>
      )}

      {currentView === 'create' && (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
          <CreateProjectDialog
            onClose={handleCancelCreate}
            onCreate={handleCreateProject}
          />
        </Suspense>
      )}

      {currentView === 'editor' && (
        <>
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
                  onClick={() => setCurrentView('create')}
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
                  onClick={() => setCurrentView('list')}
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
        </>
      )}

      {showDeployDialog && (
        <Suspense fallback={<div />}>
          <DeployDialog
            url={deployUrl}
            onClose={() => setShowDeployDialog(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
