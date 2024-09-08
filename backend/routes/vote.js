const express = require('express')
const { createSession , getAllSession, findSession, VoteCandidate, checkVote, getResult, updateSession, getCandidateData} = require('../controller/voteController')
const { checkAuthenticate, checkRole} = require('../middleware/auth')
const router = express.Router()

router.post('/vote-session' , createSession)
router.get('/getAllSessions' , getAllSession)
router.get('/findSession' , findSession)
router.post('/vote-candidate' , checkAuthenticate, checkRole("vice president") , VoteCandidate)
router.get('/checkvote/:id', checkAuthenticate , checkRole('vice president') , checkVote )
router.get('/result/:id' , getResult)
router.put('/vote-session/:id' , updateSession )
router.get('/candidate/:id' , getCandidateData)
module.exports = router