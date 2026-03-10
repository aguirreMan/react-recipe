import './index.css'
import Header from './components/Header'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className='min-h-screen bg-custom-background-color'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
