import './App.css';
import { Navigate, Route, Routes} from "react-router-dom";
import Login from './pages/login/Login.tsx';
import Home from "./pages/home/Home.tsx";
import Register from './pages/Register/Register.tsx';
import VerifyEmail from './pages/user/verify-email.tsx';
import CreateAndLoadDocuments from './pages/document/CreateAndLoadDocuments.tsx';
import { Auth} from './utils/auth-refresh-route/Auth.tsx';
import TextEditorPage from './pages/document/TextEditorPage.tsx';
import EnterEmail from './pages/Reset-Password/EnterEmail.tsx';
import ResetPassword from './pages/Reset-Password/ResetPassword.tsx';
import { useSelector } from 'react-redux';
import { UserStateType } from './vite-env';

function App() {

  const { isAuthenticated} = useSelector((state:{ user:UserStateType})=>(state.user));

  return (
    <>
    <Routes>
      <Route path="/" element={<Auth><Navigate to="/document/all/create/" /></Auth>}/>
      <Route path="/login" element={<Login/>} />  
      <Route path="/register" element={<Register/>}/>
      <Route path='/user/email' element={<EnterEmail/>} />
      <Route path='/user/refresh-token/:resetPasswordToken?' element={<ResetPassword/>}/>  
      <Route path="/user/verify-email/:token?" element={<VerifyEmail/>} />  
      <Route path="/document/all/create/" element={<Auth><CreateAndLoadDocuments/></Auth>} />
      <Route path="/document/:id?" element={<Auth><TextEditorPage/></Auth>} />
    </Routes>
    </>
  )
} 

export default App
