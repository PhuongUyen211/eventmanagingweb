import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/auth';
import Home from './components/home'; // Import component Home
import Account from './components/account';
import NoPage from './components/nopage';
//import './App.css'; // Nếu bạn có CSS để định dạng
import 'bootstrap/dist/css/bootstrap.min.css';
import MyEvent from './components/myevent';
import Eventinfo from './components/eventinfo';
import Create from './components/create';
import Noti from './components/noti';
import Login from './components/login';
import ChangePassword from './components/changepass';
import Register from './components/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="home" element={<Home />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path='register' element={<Register />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="myevent" element={<MyEvent />} />
        <Route path="eventinfo/:id" element={<Eventinfo />} />
        <Route path="create" element={<Create />} />
        <Route path="noti" element={<Noti />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
