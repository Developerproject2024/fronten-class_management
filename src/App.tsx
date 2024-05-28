import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './Auth/AuthContext';
import AppLayout from './layouts/Layouts';



function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App
