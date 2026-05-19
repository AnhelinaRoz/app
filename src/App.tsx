import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  )
}
