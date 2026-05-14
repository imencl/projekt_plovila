//import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { IME_APLIKACIJE, RouteNames } from './constants'
import PloviloPregled from './pages/plovila/PloviloPregled'
import PloviloNovi from './pages/plovila/PloviloNovi'
import PloviloPromjena from './pages/plovila/PloviloPromjena'

function App() {

  return (
    <Container>

      <Izbornik />
      <Container className='app'>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />

        <Route
          path={RouteNames.PLOVILA_PREGLED}
          element={<PloviloPregled />}
        />

        <Route
          path={RouteNames.PLOVILA_NOVO}
          element={<PloviloNovi />}
        />

        <Route
          path={RouteNames.PLOVILA_PROMJENA}
          element={<PloviloPromjena />}
        />
      </Routes>
      </Container>
      <hr />
      &copy; {IME_APLIKACIJE}
    </Container>
  )
}

export default App