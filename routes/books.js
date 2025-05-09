const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')

const {
    getAllBooks,
    getBookById,
    creatNewBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');


router.get('/', getAllBooks);


router.get('/:id', getBookById)


router.post('/', verifyTokenAndAdmin, creatNewBook)


router.put('/:id', verifyTokenAndAdmin, updateBook)


router.delete('/:id', verifyTokenAndAdmin, deleteBook)



module.exports = router;