import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Auth from "./Pages/Auth"
import DashboardAdmin from './Pages/DashboardAdmin';
import RoleAssign from './Components/RoleAssign';
import VoteSession from './Components/VoteSession';
import DashboardVoters from './Pages/DashboardVoters';
import Vote from './Components/Vote';
import Profile from './Components/Profile';
import Feedback from './Components/Feedback';
import { useEffect, useState } from 'react';
import { useAuth } from './Context/authContext'

export default function App() {
   const [data,setData] = useState({})
      
   const {isAuthenticated} = useAuth()

   useEffect(() =>{
    setData(JSON.parse(sessionStorage.getItem("auth")))
   },[isAuthenticated])
   
  return (
     <Router>
        <Routes>
          { data ? (data?.user?.role !== 'admin') ? (  
          <Route path='/' element={<DashboardVoters/>} >
          <Route path="/vote" element={<Vote/>} />
          <Route path="/profile" element={<Profile/>} />
          </Route> ) : (
          <Route path="/" element={<DashboardAdmin/>}> 
               <Route path="/role" element={<RoleAssign/>} />
               <Route path="/votesession" element = {<VoteSession/>} />
          </Route>
          ) : <Route path="/" element={<Auth/>}/> }
          <Route path="/feedback/:candidateName" element={<Feedback/>} /> 
        </Routes>
     </Router>  
  );
}
