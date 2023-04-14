import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContextStore } from './context/UserContext';
import LoginPage from './views/LoginPage';
import RequireAuth from './utils/RequireAuth';
import Dashboard from './views/Dashboard';
import { DataContextStore } from './context/DataContext';
import DetailPage from './views/DetailPage';


function App() {
  return (
    <div className="App">
      <UserContextStore>
        <DataContextStore>
          <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path="/dashboard" element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
              <Route path="/view/:id" element={
                <RequireAuth>
                  <DetailPage />
                </RequireAuth>
              } />
              <Route path="*" element={<Navigate to="/dashboard" />
              } />
            </Routes>
          </Router>
        </DataContextStore>
      </UserContextStore>
    </div>
  );
}

export default App;
