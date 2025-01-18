import './App.css'
import
{
  BrowserRouter as Router,
  Route,
  Routes
  
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ButtonAppBar from './components/AppBar'

function App() {

  return (
    <Router>
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
