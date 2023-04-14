import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Space } from 'antd'
import DataContext from '../context/DataContext'
import UserContext from '../context/UserContext'

const MainTable = ({ dataSource, showModal }) => {
  const navigate = useNavigate()
  const { deleteSelectedData } = useContext(DataContext)
  const { userToken } = useContext(UserContext)

  const onDelete = async (id) => {
    await deleteSelectedData(id, userToken)
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Alamat',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'P/W',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'born_date',
      key: 'born_date',
    },
    {
      title: 'Tanggal Input',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle" >
            <a onClick={() => navigate(`/view/${record.id}`)}>View</a>
            <a onClick={() => showModal(record.id)}>Edit</a>
            <a onClick={() => onDelete(record.id)}>Delete</a>
          </Space >
        )
      }
    },
  ];

  return (
    <Table style={{ margin: 'auto' }} columns={columns} dataSource={dataSource} />
  )
}

export default MainTable