import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const UserContext = createContext()

export const UserContextStore = ({ children }) => {
  const [showLoading, setShowLoading] = useState(false)
  const [userToken, setUserToken] = useState('')

  useEffect(() => {
    if (Cookies.get('token')) {
      setUserToken(Cookies.get('token'))
    }
  }, [Cookies.get('token')])

  const loginFlow = async ({ username, password }) => {
    setShowLoading(true)

    const response = await axios.post('https://cms-admin.ihsansolusi.co.id/testapi/auth/login', {
      email: username,
      password
    })

    Cookies.set('token', response.data.token)

    setShowLoading(false)
  }

  const logoutFlow = () => {
    Cookies.remove('token')
    setUserToken("")
  }

  const context = {
    showLoading, loginFlow, userToken, logoutFlow
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext