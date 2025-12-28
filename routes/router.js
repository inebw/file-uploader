const {Router} = require('express')
const indexController = require('../controllers/indexController')
const loginGet = require('../controllers/loginGet')
const signupGet = require('../controllers/signupGet')
const signupPost = require('../controllers/signupPost')
const passport = require('passport')


const router = Router()

router.get('/', indexController)
router.get('/login', loginGet)
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login'
}))
router.get('/sign-up', signupGet)
router.post('/sign-up', signupPost)

module.exports = router