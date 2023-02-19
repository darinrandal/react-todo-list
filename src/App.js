import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import About from './components/About'
import TaskWrapper from './components/TaskWrapper'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskWrapper />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;
