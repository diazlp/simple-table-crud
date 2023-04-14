import { useEffect, useContext } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Radio, DatePicker, Typography } from 'antd';
import DataContext from '../context/DataContext'
import UserContext from '../context/UserContext'

const { Title } = Typography

const ModalForm = ({ isEdit, modalState, onCancel }) => {
  const [form] = Form.useForm();

  const { showAPILoading, selectedData, postNewData, editSelectedData } = useContext(DataContext)
  const { userToken } = useContext(UserContext)

  useEffect(() => {
    form.setFieldsValue({
      ...selectedData,
      born_date: selectedData.born_date ? moment(selectedData.born_date) : null,
    })
  }, [form, selectedData])



  const dateConverter = (dob) => {
    const dateOfBirth = new Date(dob)

    let year = dateOfBirth.getFullYear();
    let month = dateOfBirth.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
    let day = dateOfBirth.getDate();

    let yearStr = year.toString();
    let monthStr = month.toString().padStart(2, '0');
    let dayStr = day.toString().padStart(2, '0');

    return `${yearStr}-${monthStr}-${dayStr}`;
  }

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (!isEdit) {
        await postNewData({
          ...values,
          born_date: dateConverter(values.born_date)
        }, userToken)
      } else {
        await editSelectedData(selectedData.id, {
          ...values,
          born_date: dateConverter(values.born_date)
        }, userToken)
      }

      form.resetFields();
      onCancel();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal open={modalState} onCancel={handleCancel} onOk={handleOk} okButtonProps={{
      loading: showAPILoading,
    }} okText="Send">
      <Form id="data-form" form={form} style={{ marginTop: '2rem' }}>
        <Title style={{ marginBottom: '2rem', textAlign: 'center' }}>{!isEdit ? 'Add' : 'Edit'} Data</Title>
        <Form.Item
          name="name"
          label="Nama"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Alamat"
          rules={[
            {
              required: true,
              message: 'Please enter your address',
            },
          ]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="P / W"
          rules={[
            {
              required: true,
              message: 'Please select your gender',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="l">Pria</Radio>
            <Radio value="p">Wanita</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="born_date"
          label="Tanggal Lahir"
          rules={[
            {
              required: true,
              message: 'Please select your date of birth',
            },
          ]
          }
        >
          <DatePicker placeholder="Select your date of birth" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalForm