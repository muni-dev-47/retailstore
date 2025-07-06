import { BrowserRouter, Route, Routes as Router } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Stacks from '../Components/Stacks'
import Setting from '../Components/Setting'
import Bill from '../Components/Bill'
import Stack from '../Components/Stack'
import Print from '../Components/Print'
import ProtectedRoute from './ProtectedRoute'
import Login from '../Components/Login'

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
          <Router>
            <Route path="/" element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/stacks' element={<Stacks />} />
              <Route path='/settings' element={<Setting />} />
              <Route path='/bill/:id' element={<Bill />} />
              <Route path='/stack/:sname' element={<Stack />} />
              <Route path='/billDetail/:cname' element={<Print />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Router>
      </BrowserRouter>
    </div>
  )
}

export default Routes