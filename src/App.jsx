import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from "./pages/home/Home"
import Error404 from "./pages/errors/Error404"
import Converter from "./pages/converter/Converter"
import FontPage from './pages/fontPage/FontPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />

          <Route caseSensitive={false} path="/f/:fontFrom/t/:fontTo" element={<Converter />} />
          <Route caseSensitive={false} path="/t/:fontTo/f/:fontFrom" element={<Converter />} />
          <Route caseSensitive={false} path="/:fontFrom/to/:fontTo" element={<Converter />} />

          <Route caseSensitive={false} path="/font/:fontName" element={<FontPage />} />
          <Route caseSensitive={false} path="/f/:fontName" element={<FontPage />} />
          <Route caseSensitive={false} path="/:fontName" element={<FontPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
