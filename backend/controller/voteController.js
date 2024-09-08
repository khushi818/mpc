const VoteSession = require('../model/voteSession')
const Candidate = require('../model/candidate')
const Vote = require('../model/vote')
const {jiffClient} = require('../utils/Jiff')

const createSession = async(req,res) => {
 try{
    const { candidates } = req.body
    
    const createCandidates = await Candidate.insertMany([...candidates])


    const candidateIDs = createCandidates.map((candidate, index) =>{
          return candidate._id
    })

    await VoteSession.create({ candidates : candidateIDs })

    return res.status(200).json({
        success :  true,
         message : 'session is created'
    })
   }
     catch(err) {
      console.log(err)
        return res.status(500).json({
          success: false,
          message : "failed to create role"
        })
   }
}


const getAllSession = async ( req, res ) =>{
     try{
      
      const getAllSession = await VoteSession.find().populate('candidates').sort({createdAt : -1})

      return res.status(200).json({
         success : true,
         data : getAllSession
      })

    } catch(err) {
         return res.status(500).json({
           success: false,
           message : "failed to create role"
         })
    }
}

const findSession = async(req,res) => {
   try{
      const findSession = await VoteSession.findOne({ sessionActive : true}).populate('candidates')

      return res.status(200).json({
          success : true,
          data : {
            session : findSession
          }
      })
   }
   catch(err) {
      return res.status(500).json({
        success: false,
        message : "failed to find session"
      })
 }    
}
 
const VoteCandidate = async(req,res) =>{
        try{
             const { candidate , session , comment } = req.body

             const createVote = Vote.create({
               voter: req.user._id,
               candidate: candidate,
               session : session
             })

             const findCandidate = await Candidate.findOne({_id : candidate})
               
             findCandidate.votes = findCandidate.votes + 1
             findCandidate.comments.push(comment)

             await findCandidate.save()
             
             return res.status(200).json({
                 success : true,
                 message : "you have voted sucessfully"
             })

        }
        catch(err) {
         return res.status(500).json({
           success: false,
           message : "failed to vote candidate"
         })
    }    
}


const checkVote = async(req,res) =>{
    try{
       const {id} = req.params
        let voteGiven = false;
        const vote = await Vote.findOne({$and : [{ session : id }, {voter : req.user._id}]})

        if(vote){
          voteGiven = true
        }

        return res.status(200).json({
           success : true,
           voteGiven
        })
    }
    catch(err) {
      return res.status(500).json({
        success: false,
        message : "failed in checking vote"
      })
 }   
}

const getResult = async (req, res) =>{
  try{
  const { id } = req.params;
  
  // Find the voting session by ID to ensure it exists
  const session = await VoteSession.findById(id).populate('candidates');
  if (!session) {
    return res.status(404).json({ message: 'Vote session not found' });
  }
  

  const results = [];

  // Loop through each candidate in the session
  for (let candidate of session.candidates) {
    // Find all votes for the current candidate in the given session
    const votes = await Vote.find({ session: id, candidate: candidate._id });


    // Push candidate result (including votes count and comments)
    results.push({
      id : candidate._id,
      name: candidate.name,
      votes: votes.length,
    });
  }
   
  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = results.reduce((max, candidate) => candidate.votes > max.votes ? candidate : max, results[0]);

  res.status(200).json({
    success: true,
    data : {
    totalVotes,
    winner: winner ? winner.name : null,
    results
    }
  });
}
catch(err) {
  return res.status(500).json({
    success: false,
    message : "failed in checking vote"
  })
}
}

const updateSession = async(req,res) =>{
     try{
         await VoteSession.findByIdAndUpdate({_id :req.params.id} , { sessionActive : req.body.sessionActive})
         
           res.status(200).json({
             success : true,
             message : "updated session"
           })
      }
     catch(err) {
      return res.status(500).json({
        success: false,
        message : "failed in checking vote"
      })
    }     
}

const getCandidateData = async(req,res) =>{
   try{
      const getCandidateData = await Candidate.findById(req.params.id)

      res.status(200).json({
        success : true,
        data : getCandidateData
      })
   }
   catch(err){
    return res.status(500).json({
      success: false,
      message : "failed in getting candidate"
    })
   }
}

module.exports = {
     createSession,
     findSession,
     VoteCandidate,
     getResult,
     getAllSession,
     checkVote,
     updateSession,
     getCandidateData
}