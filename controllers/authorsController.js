const asyncHandler = require('express-async-handler')
const { validateCreateAuthor, validateUpdateAuthor, Author } = require('../models/Author')



/**********
 * @description Get All authors
 * 
 * @router /api/authors
 * 
 * @method Get
 * 
 * @access public
* 
 */

const getAllAuthors = asyncHandler(async (req, res) => {
    const { pageNumber } = req.query
    const authorPerPage = 2
    const AuthorList = await Author.find().skip((pageNumber - 1) * authorPerPage).limit(authorPerPage)//.sort({firstName:1}).select('firstName lastName ')
    res.status(200).json(AuthorList)

})


/**
 * @description Get authors by id
 * @router /api/authors/:id
 * @method Get
 * @access public
 */

const getAuthorById = asyncHandler(async (req, res) => {

    const auth = await Author.findById(req.params.id)
    if (auth) {
        res.status(200).json(auth)
    } else {
        res.status(404).json({ message: 'auther not found' })

    }

})

/**
* @description Create New author
* 
* @router /api/author
* 
* @method Post
* 
* @access private(only admin)
*/

const creatNewAuthor = asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const autor = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        nationality: req.body.nationality,
        image: req.body.image,
    });

    const result = await autor.save();
    res.status(201).json(result)


})

/***
* 
* @description Update author
* 
* @route /api/authores/:id
* 
* @method Put
* 
* @access private (only admin)
*/

const updateAuthor = asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const author = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            nationality: req.body.nationality,
            image: req.body.image
        }
    }, { new: true })
    res.status(200).json(author)

})

/***
* 
* @description Delete an author
* 
* @route /api/authors/:id
* 
* @method Delete
* 
* @access private (only admin)
*/


const deleteAuthor = asyncHandler(async (req, res) => {

    const auth = Author.findById(req.params.id);
    if (auth) {
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'author has been deteted' });
    } else {
        res.status(404).json({ message: 'the author is not found' })
    }

})


module.exports = {
    deleteAuthor,
    updateAuthor,
    getAllAuthors,
    getAuthorById,
    creatNewAuthor
}