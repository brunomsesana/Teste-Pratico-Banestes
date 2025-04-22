import './colors.css'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { Perfil } from './Pages/perfil'
import AppProvider from './AppProvider'
import PagAgencia from './Pages/pagAgencia'

/**
 * Componente App
 * --------------
 * O componente principal da aplicação que configura o roteamento e o contexto global.
 * 
 * - Define as rotas da aplicação com o React Router.
 * - Envolve toda a aplicação com o `AppProvider` para fornecer o contexto global.
 * - O roteamento é feito com `HashRouter` para utilizar a navegação com URL hash (#), que é adequada para aplicativos SPA.
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
          <Route path='/agencia' element={<PagAgencia/>}/>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
