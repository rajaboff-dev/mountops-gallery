import Gallery from "./components/Gallery.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-slate-50 dark:bg-black min-h-screen p-5'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
