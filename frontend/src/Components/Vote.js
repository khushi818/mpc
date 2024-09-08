import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { toast } from 'react-toastify';
import instance from '../constant/instance'

const Vote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [candidateData , setCandidateData] = useState({})
  const [openDialog, setOpenDialog] = useState(false);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [candidates ,setCandidates] = useState([])
  const [sessionOn, setSessionOn] = useState(false)
  const [session , setSession] = useState({})
  const [comment, setComment] = useState('');
  
  const checkVote = async() =>{
      try{
         const {data} = await instance.get(`/vote/checkvote/${session?._id}`)
         if(data.voteGiven)   {
            setVoteConfirmed(true)
         }
        }
        catch(err) {
          console.log(err)
        }
}
  // Handle candidate selection
  const handleCandidateChange = (event) => {
    setSelectedCandidate(event.target.value);
    setComment('')
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Open confirmation dialog
  const handleSubmitVote = (e) => {
    e.preventDefault();
    if (selectedCandidate) {
      setOpenDialog(true);
    }
  };

  // Confirm vote
  const handleConfirmVote = async(e) => {
    e.preventDefault();
    
   try{
    await instance.post('/vote/vote-candidate' ,{
      candidate : candidateData._id,
      session : session._id,
      comment 
    })
    checkVote()
    setVoteConfirmed(true);
    setOpenDialog(false);
    alert(`Vote for ${selectedCandidate} has been confirmed!`);
   } catch(error){
    toast.error("something went wrong")
   }
    // Logic to record the vote can go here
  };

  const getSession = async() =>{
      try {
      const  { data }= await instance.get('/vote/findSession')
        
      
      if(data.data.session !== null){
        setSessionOn(data.data.session.sessionActive)
      setSession(data.data.session)
      setCandidates(data.data.session.candidates)
      
      }
      }
      catch(err) {
        console.log("something went wrong")
      }
  }

  

  useEffect(()=>{
     getSession()
  },[])

  useEffect(()=>{
    if(session) {
    checkVote()
    }
  },[session])
  // Close dialog without confirming
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      {voteConfirmed ? 
        <Typography variant="h6" align="center">
                Thank you for your vote
       </Typography> 
      :sessionOn ? (
        <>
          <Typography variant="h4" gutterBottom align="center">
            Vote for Your Candidate
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedCandidate}
              onChange={handleCandidateChange}
              aria-label="candidates"
              name="candidates"
            >
              {candidates.map((candidate, index) => (
                <FormControlLabel
                  key={index}
                  value={candidate.name}
                  control={<Radio />}
                  onClick={()=> setCandidateData(candidate)}
                  label={candidate.name}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {selectedCandidate && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Leave a feedback for {selectedCandidate}:
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={comment}
                onChange={handleCommentChange}
                variant="outlined"
                placeholder="Your comment here..."
              />
            </Box>
          )}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitVote}
              disabled={!selectedCandidate}
            >
              Submit Vote
            </Button>
          </Box>

          {/* Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to vote for {selectedCandidate}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirmVote} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h6" align="center">
         The voting session is currently closed.
        </Typography> 
      )}
    </Container>
  );
}

export default Vote;
