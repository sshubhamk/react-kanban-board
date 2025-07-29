import { ConfigProvider, Modal, theme } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Section from './components/Section.js';
import { DEFAULT_BOARD } from './data/default.board.js';
import { themeSwitchBtnStyle } from './styles/styles';
import UtilityFunctions from './utility/UtilityFunctions';
import { darkTokens, lightTokens } from './utility/theme.token.js';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [titleColor, setTitleColor] = useState('');
  const [allSections, setAllSections] = useState([...DEFAULT_BOARD]);
  const [projectName, setProjectName] = useState(localStorage.getItem('projectName') || '');
  const [isModalOpen, setIsModalOpen] = useState(projectName.length === 0);
  const [filteredSections, setFilteredSections] = useState([...DEFAULT_BOARD]);

  // Memoize theme tokens and styles for performance
  const currentTokens = useMemo(() => (isDark ? darkTokens : lightTokens), [isDark]);
  const mainBg = currentTokens.colorBackground;
  const mainColor = isDark ? '#fff' : '#000';

  const inputStyle = useMemo(() => ({
    width: '96%',
    padding: '0.5rem',
    borderRadius: '8px',
    border: `1px solid ${currentTokens.colorPrimaryBorder}`,
  }), [currentTokens]);


  const mainContainerStyle = useMemo(() => ({
    background: mainBg,
    color: mainColor,
    transition: 'background 0.3s',
    padding: '0 2rem 2rem',
    // margin: 'auto',
  }), [mainBg, mainColor]);

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
  };

  const onDeleteBoard = useCallback((id) => {
    setAllSections(prev => prev.filter(item => item.id !== id));
  }, []);

  const onUpdateTitle = useCallback((id, newTitle) => {
    setAllSections(prev => prev.map(item => item.id === id ? { ...item, title: newTitle } : item));
  }, []);

  const addNewCard = useCallback((boardId, newCard) => {
    const card = {
      id: UtilityFunctions.generateId(),
      title: newCard.cardTitle,
      description: newCard.cardDescription,
    };
    setAllSections(prev => prev.map(board =>
      board.id === boardId ? { ...board, cards: [...board.cards, card] } : board
    ));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      if (!term) {
        setFilteredSections(allSections);
      } else {
        setFilteredSections(
          allSections.map(board => ({
            ...board,
            cards: board.cards.filter(card =>
              card.title.toLowerCase().includes(term) ||
              card.description.toLowerCase().includes(term)
            )
          }))
        );
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, allSections]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: currentTokens,
      }}
    >
      <div style={mainContainerStyle}>
        <Header
          projectName={projectName}
          titleColor={titleColor}
          isDark={isDark}
          mainBg={mainBg}
          handleThemeSwitch={handleThemeSwitch}
          themeSwitchBtnStyle={themeSwitchBtnStyle}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Section
          mainBg={mainBg}
          mainColor={mainColor}
          filteredSections={filteredSections}
          onDeleteBoard={onDeleteBoard}
          onUpdateTitle={onUpdateTitle}
          addNewCard={addNewCard}
          addNewBoard={addNewBoard}
        />
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
