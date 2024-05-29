import React from 'react';
import { Box, Container } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';
import ToolBar from '../components/ToolBar/ToolBar';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../pages/Home/Home';
import Teacher from '../pages/Teachers/Teachers';
import Footer from '../components/Footer/Footer';

function AppLayout() {
    const { isAuthenticated } :any = useAuth();
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isAuthenticated && (
          <>
            <ToolBar></ToolBar>
            <Container component="main" sx={{ flex: 1, mt: 2 }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/teachers" element={<Teacher />} />
              </Routes>
            </Container>
            <Footer />
          </>
        )}
        {!isAuthenticated && (
          <Container component="main" sx={{ flex: 1, mt: 2 }}>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
            </Routes>
          </Container>
        )}
      </Box>
    );
  }

  export default AppLayout;