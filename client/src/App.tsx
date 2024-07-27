import { Link, Outlet } from 'react-router-dom'
import { Button } from './components/ui/button'

function App() {
  return (
    <>
      <Link to={'/admin-page'}>
        <Button className="top-10 left-10 absolute text-2xl bold">
          Admin Page
        </Button>
      </Link>
      <Outlet />
    </>
  )
}

export default App
