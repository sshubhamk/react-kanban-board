import { Button } from 'antd';
import DarkIcon from '../assets/DarkIcon';
import LightIcon from '../assets/LightIcon';

const Header = ({ projectName, titleColor, isDark, handleThemeSwitch, themeSwitchBtnStyle, mainBg }) => {

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


  return (
    <div style={flexEndStyle}>
      {projectName.length > 0 && (
        <h1 style={{ fontWeight: '700', color: titleColor }}>{projectName}</h1>
      )}
      <Button style={themeSwitchBtnStyle} icon={isDark ? <LightIcon /> : <DarkIcon />}
        onClick={handleThemeSwitch} />
    </div>
  )
}

export default Header;