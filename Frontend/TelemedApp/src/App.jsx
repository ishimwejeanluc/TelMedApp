// App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'  // Import the routes from AppRoutes

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />  // Use the consolidated routes
      </AuthProvider>
    </Router>
  )
}

export default App