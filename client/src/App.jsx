import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import './index.css'

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ReportFormPage from "./pages/ReportFormPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          < Route path='/' element={<HomePage/>}/>
          < Route path='/login' element={<LoginPage />}/>
          < Route path='/register' element={<RegisterPage />} />

          <Route element={<ProtectedRoute/>}>
            < Route path='/reports' element={<ReportsPage/>}/>
            < Route path='/add-report' element={<ReportFormPage/>}/>
            < Route path='/report/:id' element={<ReportFormPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


export default App