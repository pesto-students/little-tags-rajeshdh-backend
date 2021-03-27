const express = require('express')
const authRoute = require('./auth.route');
const auth = require('../../middlewares/auth');

const router = express.Router()

router.get('/', auth(), (req, res) => {
    console.log("im here ");
    res.send("Dashboard");
});

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    }
]

defaultRoutes.forEach(route => router.use(route.path, route.route))

module.exports = router;