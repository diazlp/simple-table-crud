import { useContext } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Alert } from 'antd';
import UserContext from '../context/UserContext';
import { Navigate, Link } from 'react-router-dom';

const { Title } = Typography

const LoginPage = () => {
  const { userToken, loginFlow, showLoading, showError } = useContext(UserContext)

  const onFinish = (values) => {
    loginFlow({
      email: values.email,
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
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="johndoe@mail.com" />
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
                placeholder='********'
              />
            </Form.Item>

            {
              showError &&
              <Alert style={{ marginBottom: '1rem' }} message={showError} type="error" />
            }

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={showLoading}>
                  Log in
                </Button>
                or
                <Link to={"/register"}>register now!</Link>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage