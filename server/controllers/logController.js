const Express = require('express');
const router = Express.Router();

router.get('/about', (req, res) => {
    res.send("This is the about route")
});

module.exports = router;