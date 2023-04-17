import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const UserContext = createContext()

export const UserContextStore = ({ children }) => {
  const [showLoading, setShowLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState('')
  const [userToken, setUserToken] = useState('')

  const token = Cookies.get('token')
  useEffect(() => {
    if (token) {
      setUserToken(token)
    }
  }, [token])

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const loginFlow = async ({ email, password }) => {
    try {
      setShowLoading(true)

      const response = await axios.post('https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/login', {
        email,
        password
      }, {
        timeout: 10000
      })

      Cookies.set('token', response.data.token)

      setShowLoading(false)
    } catch (err) {
      setShowLoading(false)
      setShowError(err.response?.data?.detail || 'An error occured')
    }
  }



  const registerFlow = async ({ name, email, password }) => {
    try {
      setShowLoading(true)

      await axios.post('https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/register', {
        name,
        email,
        password
      }, {
        timeout: 10000
      })

      setShowSuccess(true)
      setShowLoading(false)
    } catch (err) {
      setShowLoading(false)
      setShowError(err.response?.data?.detail || 'An error occured')
    }
  }

  const logoutFlow = () => {
    Cookies.remove('token')
    setUserToken("")
  }

  const context = {
    showLoading, showSuccess, showError, loginFlow, registerFlow, userToken, logoutFlow
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext