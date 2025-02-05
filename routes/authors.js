const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')
const {
  getAllAuthors
  , getAuthorById,
  deleteAuthor,
  updateAuthor,
  creatNewAuthor
} = require('../controllers/authorsController')


router.get('/', getAllAuthors)

router.get('/:id', getAuthorById)

router.post('/', verifyTokenAndAdmin, creatNewAuthor)

router.put('/:id', verifyTokenAndAdmin, updateAuthor)

router.delete('/:id', verifyTokenAndAdmin, deleteAuthor)


module.exports = router;