import { useEffect, useContext } from 'react'
import { Card, Avatar } from 'antd';
import { useParams } from 'react-router-dom'
import Header from '../component/Header'
import DataContext from '../context/DataContext'
import UserContext from '../context/UserContext'

const { Meta } = Card;

const DetailPage = () => {
  const params = useParams()
  const { selectedData, getSelectedData } = useContext(DataContext)
  const { userToken } = useContext(UserContext)

  const { id } = params

  useEffect(() => {
    if (!Object.keys(selectedData).length) {
      (async () => {
        await getSelectedData(id, userToken)
      })()
    }
  }, [selectedData, getSelectedData, id, userToken])

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Card
          style={{ width: 500, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
        >
          <Meta
            avatar={<Avatar>{selectedData.name?.[0]}</Avatar>}
            title={selectedData.name}
            description={
              <>
                <p>Address: {selectedData.address}</p>
                <p>Gender: {selectedData.gender === 'l' ? 'Pria' : 'Wanita'}</p>
                <p>Tanggal Lahir: {new Date(selectedData.born_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </>
            }
          />
        </Card>
      </div>
    </>
  )
}

export default DetailPage