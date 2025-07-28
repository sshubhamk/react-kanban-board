import { Button, ConfigProvider, Modal, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import AddIcon from './assets/AddIcon';
import DarkIcon from './assets/DarkIcon';
import LightIcon from './assets/LightIcon';
import KanbanBoard from './components/KanbanBoard';
import UtilityFunctions from './utility/UtilityFunctions';
import { DEFAULT_BOARD } from './data/default.board.js';

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
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [titleColor, setTitleColor] = useState('');
  const [allSections, setAllSections] = useState([...DEFAULT_BOARD]);
  const [sections, setSections] = useState([...DEFAULT_BOARD]);
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
    setTitleColor(UtilityFunctions.generateRandomColor());

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
    background: mainBg,
    color: mainColor,
    transition: 'background 0.3s',
    padding: '0 2rem 2rem',
    // margin: 'auto',
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

  const mainBoardStyle = {
    display: 'flex',
    gap: '1rem',
    paddingBottom: '1rem',
  };

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
      title: projectName || `Board ${allSections.length + 1}`,
      cards: [],
      color: UtilityFunctions.generateRandomColor(),
    };
    setAllSections(prevBoards => [
      ...prevBoards,
      board,
    ]);
    setSections(prevBoards => [
      ...prevBoards,
      board,
    ]);
  };

  const onDeleteBoard = (id) => {
    setAllSections(prevBoards => prevBoards.filter((item) => item.id !== id));
    setSections(prevBoards => prevBoards.filter((item) => item.id !== id));
  };

  const onUpdateTitle = (id, newTitle) => {
    setAllSections(prevBoards => prevBoards.map((item) => item.id === id ? { ...item, title: newTitle } : item));
    setSections(prevBoards => prevBoards.map((item) => item.id === id ? { ...item, title: newTitle } : item));
  };

  const addNewCard = (boardId, newCard) => {
    setAllSections(prevBoards => prevBoards.map(board => {
      if (board.id === boardId) {
        return { ...board, cards: [...board.cards, newCard] };
      }
      return board;
    }));
    setSections(prevBoards => prevBoards.map(board => {
      if (board.id === boardId) {
        return { ...board, cards: [...board.cards, newCard] };
      }
      return board;
    }));
  };

  const searchCards = (searchTerm) => {
    setSearchTerm(searchTerm);
    const term = searchTerm.toLowerCase();
    if (term.length) {
      setSections(allSections.map(board => ({
        ...board,
        cards: board.cards.filter(card =>
          card.title.toLowerCase().includes(term) ||
          card.description.toLowerCase().includes(term)
        )
      })));
    } else {
      setSections([...allSections]);
    }
  };

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
            <h1 style={{ fontWeight: '700', color: titleColor }}>{projectName}</h1>
          )}
          <Button style={themeSwitchBtnStyle} icon={isDark ? <LightIcon /> : <DarkIcon />}
            onClick={handleThemeSwitch} />
        </div>

        <div style={{
          width: '100%',
          padding: '2rem 0',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <input style={{ width: '25%' }} value={searchTerm} onChange={(e) => searchCards(e.target.value)}
            placeholder='Search for cards with title or description' />
        </div>

        <div style={mainBoardStyle}>
          <div style={sectionStyle}>
            {sections?.map((board) => (
              <KanbanBoard props={board} key={board.id}
                onDeleteBoard={onDeleteBoard}
                onUpdateTitle={onUpdateTitle}
                addNewCard={addNewCard} />
            ))}
          </div>

          <div style={{
            minHeight: '50px',
            minWidth: '50px',
          }}>
            <Button style={addBoardBtnStyle} type="primary" onClick={addNewBoard}>
              <AddIcon />
            </Button>
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
