import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from './component/signup';
import Login from './component/login';
import ForgotPassword from './component/forgotPassword';
import ResetPassword from './component/resetPassword';
import BlogList from './component/BlogList';
import BlogCreate from './component/BlogCreate';
import BlogUpdate from './component/BlogUpdate';
import AllUsers from './component/Dashboard';
import BlogDetail from './component/BlogDetail';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/api/users/signup" element={<Signup />} />
          <Route path="/api/users/login" element={<Login />} />
          <Route path="/api/users/forgotPassword" element={<ForgotPassword />} />
          <Route path="/api/users/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/api/users/login" replace />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/create" element={<BlogCreate />} />
          <Route path="/blogs/:id/edit" element={<BlogUpdate />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/admin" element={<AllUsers />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}   // closes in 3s
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"     // "dark" or "colored" also possible
        />

      </Router>
    </div>
  );
}

export default App;
