import { Button, ConfigProvider, Modal, theme } from 'antd';
import { useMemo, useState, useEffect } from 'react';
import './App.css';
import AddIcon from './assets/AddIcon';
import DarkIcon from './assets/DarkIcon';
import LightIcon from './assets/LightIcon';
import KanbanBoard from './components/KanbanBoard';
import UtilityFunctions from './utility/UtilityFunctions';

const lightTokens = {
  colorPrimary: '#3D5AFE',
  colorSecondary: '#FF5252',
  colorBackground: '#F5F7FA',
  colorPrimaryHover: '#304FFE',
  colorPrimaryBorder: '#1976d2',
  colorBorder: '#e0e0e0',
  colorPrimaryOutline: '#90caf9',
};

const darkTokens = {
  colorPrimary: '#00E5FF',
  colorSecondary: '#FFEA00',
  colorBackground: '#212121',
  colorPrimaryHover: '#00B8D4',
  colorPrimaryBorder: '#90caf9',
  colorBorder: '#424242',
  colorPrimaryOutline: '#1976d2',
};

function App() {
  const [sections, setSections] = useState([
    { id: UtilityFunctions.generateId(), color: UtilityFunctions.generateRandomColor(), title: 'Backlogs' },
    { id: UtilityFunctions.generateId(), color: UtilityFunctions.generateRandomColor(), title: 'To Do' },
    { id: UtilityFunctions.generateId(), color: UtilityFunctions.generateRandomColor(), title: 'In Progress' },
    { id: UtilityFunctions.generateId(), color: UtilityFunctions.generateRandomColor(), title: 'Done' },
  ]);
  const [isDark, setIsDark] = useState(false);
  const [projectName, setProjectName] = useState(localStorage.getItem('projectName') || '');
  const [isModalOpen, setIsModalOpen] = useState(projectName.length === 0);

  // Memoize theme tokens and styles for performance
  const currentTokens = useMemo(() => (isDark ? darkTokens : lightTokens), [isDark]);
  const mainBg = currentTokens.colorBackground;
  const mainColor = isDark ? '#fff' : '#000';

  useEffect(() => {
    const systemPrefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(systemPrefersDark);

    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle dark-mode class on body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDark]);

  const mainContainerStyle = useMemo(() => ({
    minHeight: '100dvh',
    background: mainBg,
    color: mainColor,
    transition: 'background 0.3s',
    padding: '1rem',
    paddingTop: '0',
    margin: 'auto',
  }), [mainBg, mainColor]);

  const flexEndStyle = {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: mainBg,
    padding: '0.5rem 0',
    boxShadow: 'rgb(81 81 81 / 12%) 0 1px 1px 0px'
  };

  const themeSwitchBtnStyle = {
    boxShadow: 'none',
    border: 'none',
    background: 'transparent',
  };

  const sectionStyle = useMemo(() => ({
    background: mainBg,
    color: mainColor,
    display: 'flex',
    gap: '1rem',
    minHeight: '90dvh'
  }), [mainBg, mainColor]);

  const addBoardBtnStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    marginTop: '1rem',
    transition: 'transform 0.2s',
  };

  const inputStyle = useMemo(() => ({
    width: '96%',
    padding: '0.5rem',
    borderRadius: '8px',
    border: `1px solid ${currentTokens.colorPrimaryBorder}`,
  }), [currentTokens]);

  const handleThemeSwitch = () => setIsDark(prev => !prev);

  const handleOk = () => {
    localStorage.setItem('projectName', projectName);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setProjectName('');
    localStorage.setItem('projectName', '');
    setIsModalOpen(false);
  };

  const addNewBoard = () => {
    const board = {
      id: UtilityFunctions.generateId(),
      title: projectName || `Board ${sections.length + 1}`,
    };
    setSections(prevBoards => [
      ...prevBoards,
      board,
    ]);
  };

  const onDeleteBoard = (id) => {
    setSections(prevBoards => prevBoards.filter((item) => item.id !== id));
  };

  const onUpdateTitle = (id, newTitle) => {
    setSections(prevBoards => prevBoards.map((item) => item.id === id ? { ...item, title: newTitle } : item));
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: currentTokens,
      }}
    >
      <div style={mainContainerStyle}>
        <div style={flexEndStyle}>
          {projectName.length > 0 && (
            <h1 style={{ fontWeight: '700' }}>{projectName}</h1>
          )}
          <Button style={themeSwitchBtnStyle} icon={isDark ? <LightIcon /> : <DarkIcon />}
            onClick={handleThemeSwitch} />
        </div>
        <div style={{
          overflow: 'auto',
          height: '100%',
        }}>
          <div style={sectionStyle}>
            {sections.map((board) => (
              <KanbanBoard props={board} key={board.id} onDeleteBoard={onDeleteBoard} onUpdateTitle={onUpdateTitle} />
            ))}
            <div style={sectionStyle}>
              <Button style={addBoardBtnStyle} type="primary" onClick={addNewBoard}>
                <AddIcon />
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title="What would you like to name your project?"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input style={inputStyle} type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default App;
