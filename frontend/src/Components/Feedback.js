import React, { useState , useEffect  } from 'react';
import { useParams , Link} from 'react-router-dom';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import instance from '../constant/instance'

const Feedback = () => {
  const { candidateName } = useParams();
   const [candidateData,setCandidateData] = useState({})
  const getData = async() =>{
    try{
    const {data} = await instance.get(`/vote/candidate/${candidateName}`)

    setCandidateData(data.data)
    }
    catch(err) {
      console.log(err)
    }
  }
  
  useEffect(()=>{
      getData()
  },[])
  const candidate = {
    name: candidateData.name,
    votes: candidateData.votes,
    comments: candidateData.comments
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Candidate Details
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">{candidate.name}</Typography>
        <Typography variant="h6">Votes: {candidate.votes}</Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        Feedback:
      </Typography>
      <List>
        {candidate?.comments?.length ? (
          candidate.comments.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText primary={`- ${comment}`} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments
          </Typography>
        )}
      </List>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" href="/results">
        <Link to="/votesession">
          Back to Results
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default Feedback;
