import React, { useState , useEffect  } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { format } from 'date-fns';
import instance from '../constant/instance'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
const VoteSession = () => {
  const [candidateName, setCandidateName] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [sessionOn, setSessionOn] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [getAllSession , setGetAllSession] = useState([])
  const [getResult, setGetResult] = useState({})
  const [activeSession , setActiveSession] = useState(false)

  const handleAddCandidate = () => {
    if (candidateName) {
      setCandidates([...candidates, { name: candidateName }]);
      setCandidateName('');
    }
  };

  const handleToggleSession = async(event) => {
    try{
    event.preventDefault()
    
    await instance.post('/vote/vote-session', { candidates })  
    
    if (!createdAt) {
      setCreatedAt(new Date());
    }
    allSessions()
  }
  catch(err) {
     toast.error("something went wrong")
  }
  };

  const handleViewResults =async(id) => {
    // Logic to view results
    const { data } = await instance.get(`/vote/result/${id}`)
    setGetResult(data.data)
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setGetResult('')
  }

  const allSessions = async() =>{
    const {data} = await instance.get('/vote/getAllSessions')
    
    setGetAllSession([...data.data])

    checkSession()
  }

  const checkSession = async() =>{
    const  check = await instance.get('/vote/findSession')

    if(check.data.data.session !== null) {
       setActiveSession(true)
    }
    else{
      setActiveSession(false)
    }
  }

  console.log(activeSession)

  const handleUpdateSession = async(id , sessionActive) => {
    await instance.put(`/vote/vote-session/${id}` , {sessionActive})
    allSessions()
  }

  useEffect(() =>{
     allSessions()
  } , [])
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Vote for President
      </Typography>
      

      {/* Form to Add Candidates */}
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
        <TextField
          label="Candidate Name"
          variant="outlined"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddCandidate} fullWidth>
          Add Candidate
        </Button>
      </Box>

      {/* Table to Display Candidates */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow key={index}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setCandidates(candidates.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

         
        {/* Toggle Voting Session */}
        <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
        <Button variant="contained" color="secondary" 
          onClick={handleToggleSession} 
          disabled = {(activeSession)}
          sx={{ mt: 2 }}
        >
          Create Session
        </Button>
      </Box>  

         {/* Table to Display Users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No</TableCell>
              <TableCell>Candidates</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllSession?.map((session, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{session.candidates.map((c, index) =>(
                    <p>{c.name}</p>
                ))}</TableCell>
                <TableCell>
                <FormControlLabel
                 control={<Switch checked={session.sessionActive} onChange={(e) =>{
                  e.preventDefault()
                  handleUpdateSession(session._id , !session.sessionActive)
                }} />}
                 label={session.sessionActive ? 'Voting Session: ON' : 'Voting Session: OFF'}
                 disabled = {!session.sessionActive}
               />
                </TableCell>
                <TableCell>{session.createdAt}</TableCell>
                {!session.sessionActive &&
                <TableCell><Button variant="contained" color="primary" onClick={(e) =>{
                  e.preventDefault()
                  handleViewResults(session._id)
                }}>
               View Results
               </Button>
              </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Voting Results
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Total Voters: {getResult.totalVotes}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Winner: {getResult.winner}
            </Typography>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell align="right">Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {Object.keys(votes).map((candidate, index) => ( */}
                {getResult?.results?.map((r, index) =>(
                  <TableRow >
                    <Link to={`/feedback/${r.id}`}>
                    <TableCell style={{cursor: 'pointer'}}>{r.name}
              
                    </TableCell>
                    </Link>
                    <TableCell align="right">{r.votes}</TableCell>
                  </TableRow>
                ))}
                {/* ))} */}
              </TableBody>
            </Table>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default VoteSession;
