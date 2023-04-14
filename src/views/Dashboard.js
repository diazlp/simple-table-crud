import { useState, useEffect, useContext } from 'react'
import { Button, Spin } from 'antd'
import Header from '../component/Header'
import DataContext from '../context/DataContext'
import UserContext from '../context/UserContext'
import MainTable from '../component/MainTable'
import ModalForm from '../component/ModalForm'

const Dashboard = () => {
  const [modalState, setModalState] = useState(false)
  const [editModal, setEditModal] = useState("")
  const { showDataLoading, dataList, fetchDataList, getSelectedData, setSelectedData } = useContext(DataContext)
  const { userToken } = useContext(UserContext)

  useEffect(() => {
    if (!dataList.length && !showDataLoading) {
      fetchDataList(userToken)
    }
  }, [dataList, fetchDataList, userToken, showDataLoading])

  const showModal = async (selectedId) => {

    if (selectedId) {
      await getSelectedData(selectedId, userToken)
      setEditModal(selectedId)
    }

    setModalState(true)
  }

  const closeModal = () => {
    setEditModal("")
    setSelectedData({})
    setModalState(false)
  }

  const data = dataList.map(({ id, name, address, gender, born_date, created_at }, i) => ({
    key: i + 1,
    id,
    name,
    address,
    gender: gender === 'l' ? 'Pria' : 'Wanita',
    born_date: new Date(born_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    created_at: new Date(created_at).toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta', hour12: true, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  }))

  return (
    <>
      <Header />
      <div style={{ margin: 'auto', width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <Button type="primary" onClick={() => showModal()}>
            Add Data
          </Button>
          <ModalForm isEdit={editModal} modalState={modalState} onCancel={closeModal} />
        </div>
        <Spin spinning={showDataLoading}>
          <MainTable dataSource={data} showModal={showModal} />
        </Spin>
      </div>
    </>
  )
}

export default Dashboard