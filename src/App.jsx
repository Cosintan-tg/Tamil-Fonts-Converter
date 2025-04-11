import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from "./pages/home/Home"
import Error404 from "./pages/errors/Error404"
import Converter from "./pages/converter/Converter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />

          <Route caseSensitive={false} path="/f/:fontFrom/t/:fontTo" element={<Converter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
