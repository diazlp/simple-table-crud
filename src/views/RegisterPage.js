import { useContext } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Alert } from 'antd';
import UserContext from '../context/UserContext';
import { Navigate, Link } from 'react-router-dom';

const { Title } = Typography

const RegisterPage = () => {
  const { userToken, registerFlow, showLoading, showSuccess } = useContext(UserContext)
  const [form] = Form.useForm()

  const onFinish = (values) => {
    registerFlow({
      name: values.name,
      email: values.email,
      password: values.password
    })

    form.resetFields()
  };

  if (userToken) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ margin: 'auto', width: '30%' }}>
        <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
          <Title style={{ marginBottom: '3rem' }}>Register</Title>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
                {
                  min: 8,
                  message: 'Name must be minimum 8 characters.'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your full name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your email address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  min: 8,
                  message: 'Password must be minimum 8 characters.'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Your password"
              />
            </Form.Item>

            {
              showSuccess &&
              <Alert style={{ marginBottom: '1rem' }} message={'Berhasil mendaftar'} type="success" />
            }

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={showLoading}>
                  Register
                </Button>
                or
                <Link to={"/login"}>back to login</Link>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage