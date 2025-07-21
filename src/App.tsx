import { } from 'react-router-dom'
import { RouterContainer } from "./routes/Routes"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
/* import { SelectedProvider } from './context/SelectedModuleContext.tsx' */
function App() {
  /* min-h-screen bg-gray-100 flex items-center justify-center p-4 */
  return (
    <BrowserRouter >
      <ToastContainer />
      <RouterContainer />
    </BrowserRouter>
  )
}

export default App
