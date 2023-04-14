import './Header.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import UserContext from '../context/UserContext';
import DataContext from '../context/DataContext'

const Header = () => {
  const navigate = useNavigate()
  const { setSelectedData } = useContext(DataContext)
  const { logoutFlow } = useContext(UserContext)

  const onTitleClick = () => {
    setSelectedData({})
    navigate('/dashboard')
  }

  return (
    <header className="header-container">
      <div className="header-left" onClick={onTitleClick}>Simple CRUD</div>
      <div className="header-right">
        <Button type='primary' onClick={logoutFlow}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;