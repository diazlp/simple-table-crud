import { useContext } from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import { Table, Space, Button } from 'antd'
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
            <Button type={"primary"} onClick={() => navigate(`/view/${record.id}`)}>View</Button>
            <Button type={"primary"} style={{ backgroundColor: 'orange' }} onClick={() => showModal(record.id)}>Edit</Button>
            <Button type={"primary"} style={{ backgroundColor: 'red' }} onClick={() => onDelete(record.id)}>Delete</Button>
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