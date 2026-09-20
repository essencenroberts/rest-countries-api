import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";


function App() {
  return (
    <>
      <BrowserRouter>
        
        <div className="mx-auto min-h-screen max-w-7xl px-6">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:code" element={<Details />} />
            </Routes>
          </main>
        </div>
       
      </BrowserRouter>
    </>
  )
}

export default App;