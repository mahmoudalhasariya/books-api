const asyncHandler = require('express-async-handler')
const { validateCreatBook, validateUpdatBook, Book } = require('../models/Book')


/***
     * 
     * @description Get all Books
     * 
     * @route /api/books
     * 
     * @method Get
     * 
     * @access public
     */
const getAllBooks = asyncHandler(async (req, res) => {

    const { minPrice, maxPrice } = req.query
    let books;
    if (minPrice && maxPrice) {
        books = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } })
            .populate('author', ['_id', 'firstName', 'lastName']) // هذه الدالة تحضر اوبجيكت الاثر 
        res.status(200).json(books)
    } else {
        books = await Book.find()
            .populate('author', ['_id', 'firstName', 'lastName'])
        res.status(200).json(books)
    }


})

/***
 * 
 * @description Get book by Id
 * 
 * @route /api/books/:id
 * 
 * @method Get
 * 
 * @access public
 */

const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ message: 'book not found' })
    }
})


/***
    * 
    * @description Creat new book
    * 
    * @route /api/books
    * 
    * @method Post
    * 
    * @access private (only admin)
    */

const creatNewBook = asyncHandler(async (req, res) => {  // البوست ميثود بيعمل اوبجيكت جديد

    const { error } = validateCreatBook(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message }) // bad req
    }
    const book = new Book(
        {

            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            cover: req.body.cover
        })

    const result = await book.save()
    res.status(201).json(result)  // انشاء ناجح
})


/***
    * 
    * @description Update a book
    * 
    * @route /api/books/:id
    * 
    * @method Put
    * 
    * @access private (only admin)
    */

const updateBook = asyncHandler(async (req, res) => {
    const { error } = validateUpdatBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {    // $set: هو مشغل يستخدم في MongoDB لتحديد الحقول التي سيتم تحديثها في الكتاب. في هذه الحالة، يتم تحديث الحقول: title, author, price, description, و cover.
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            cover: req.body.cover,
        }
    }, { new: true })  //هذا الخيار يضمن أن الدالة findByIdAndUpdate تُرجع النسخة المحدثة من المستند بدلاً من النسخة الأصلية.
    res.status(200).json(updateBook)

})

/***
 * 
 * @description Delete a book
 * 
 * @route /api/books/:id
 * 
 * @method Delete
 * 
 * @access private (only admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
 
    const book = await Book.findById(req.params.id)
    if (book) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'book has been deteted' });
    } else {
        res.status(404).json({ message: 'the book is not found' })
    }
})


module.exports = {
    getAllBooks,
    getBookById,
    creatNewBook,
    updateBook,
    deleteBook
}
