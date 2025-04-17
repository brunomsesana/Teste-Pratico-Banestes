import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { Perfil } from './Pages/perfil'
import AppProvider from './AppProvider'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
