import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main>
           <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/details" element={<Details/>} /> */}
          </Routes>
        </main>
       
      </BrowserRouter>
    </>
  )
}

export default App;