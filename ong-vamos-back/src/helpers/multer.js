const multer = require('multer')


module.exports = {

    async uploadArquivos (req, res) {
        console.log(req.file)
        return res.json({hello: 'woooo'})
    }



}