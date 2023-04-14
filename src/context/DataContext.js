import { useState, createContext } from 'react'
import axios from 'axios'

const DataContext = createContext()

export const DataContextStore = ({ children }) => {
  const [showDataLoading, setShowDataLoading] = useState(false)
  const [showAPILoading, setShowAPILoading] = useState(false)
  const [dataList, setDataList] = useState([])
  const [selectedData, setSelectedData] = useState({})

  const fetchDataList = async (token) => {
    setShowDataLoading(true)
    const response = await axios.get('https://cms-admin.ihsansolusi.co.id/testapi/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setDataList(response.data.data)

    response.data.data.length && setShowDataLoading(false)
  }

  const getSelectedData = async (payload, token) => {
    setShowDataLoading(true)
    const response = await axios.get(`https://cms-admin.ihsansolusi.co.id/testapi/user/${payload}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setSelectedData(response.data.data)
    setShowDataLoading(false)
  }

  const postNewData = async (payload, token) => {
    setShowAPILoading(true)

    await axios.post('https://cms-admin.ihsansolusi.co.id/testapi/user', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await fetchDataList(token)
    setShowAPILoading(false)
  }

  const editSelectedData = async (id, payload, token) => {
    setShowAPILoading(true)

    await axios.put(`https://cms-admin.ihsansolusi.co.id/testapi/user/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await fetchDataList(token)
    setShowAPILoading(false)
  }

  const deleteSelectedData = async (payload, token) => {
    setShowAPILoading(true)
    await axios.delete(`https://cms-admin.ihsansolusi.co.id/testapi/user/${payload}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await fetchDataList(token)
    setShowAPILoading(false)
  }

  const context = {
    showDataLoading,
    showAPILoading,
    dataList,
    selectedData,
    fetchDataList,
    postNewData,
    deleteSelectedData,
    getSelectedData,
    setSelectedData,
    editSelectedData
  }

  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>
  )

}

export default DataContext
