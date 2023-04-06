import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import AdminLayout from './components/layout/AdminLayout';

import Workspace from './pages/Workspace.jsx';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './css/custom-scrollbar.css';

function App() {
    const theme = createTheme({
        palette: { 
            mode: 'dark', 
            primary: {
                main: '#ffd154',
            },
            secondary: {
                main: '#3d3d3d',
            }, 
        },
    });
    return (
            <ThemeProvider theme={theme}>
                <CssBaseLine/>
                <BrowserRouter>
                    <Routes>
                        <Route path='/'>
                            <Route index element={<Home/>}/>
                        </Route>
                        <Route path='/' element={<AuthLayout/>}>
                            <Route path='login' element={<Login/>}/>
                            <Route path='signup' element={<Signup/>}/>
                        </Route>
                        <Route path='/' element={<AppLayout/>}>
                            {/* <Route index element={<Workspace/>}/> */}
                            <Route path='boards' element={<Workspace/>}/>
                            <Route path='boards/:boardId' element={<Board/>}/>
                        </Route>
                        <Route path='/' element={<AdminLayout/>}>
                            <Route path='admin' element={<Admin/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
    );
}

export default App;
