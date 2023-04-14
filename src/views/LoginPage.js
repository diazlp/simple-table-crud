import { useContext } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const { Title } = Typography

const LoginPage = () => {
  const { userToken, loginFlow, showLoading } = useContext(UserContext)

  const onFinish = (values) => {
    loginFlow({
      username: values.username,
      password: values.password
    })
  };

  if (userToken) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ margin: 'auto', width: '30%' }}>
        <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
          <Title style={{ marginBottom: '3rem' }}>Simple CRUD App</Title>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={showLoading}>
                  Log in
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>

  )
}

export default LoginPage