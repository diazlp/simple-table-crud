import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext';


const RequireAuth = ({ children }) => {
  const { userToken } = useContext(UserContext)

  if (!userToken) {
    return <Navigate to="/login" replace />
  } else {
    return children
  }

}

export default RequireAuth