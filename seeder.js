const {books,authors}=require('./data') // مصفوفة الكتب
const {Book}=require('./models/Book') // الكوليكشين في قاعدة اللبيانات
const {Author}=require('./models/Author')
const connectDB =require('./config/db')
require('dotenv').config()

// Connect To Data base
connectDB()

// Import books

const importBooks= async ()=>{
try {
    await Book.insertMany(books)
    console.log('books imported')
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

// Remove Books
const removeBooks=async ()=>{
  try{
    await Book.deleteMany()
    console.log('books removed')
  }catch(error){
   process.exit(1)
  }
}


if(process.argv[2] ==='-import'){
    importBooks()
} else if(process.argv[2] === '-remove'){
    removeBooks()
}

//Import Author
const importAuthors= async()=>{
try {
  await Author.insertMany(authors)
  console.log('author inserted')
} catch (error) {
  console.log(error)
  process.exit(1)
}
}

// remove author
const removeAuthors= async()=>{
  try {
    await Author.deleteMany(authors)
    console.log('author Removed')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if(process.argv[2]==='-import-authors'){
importAuthors()
}else if(process.argv[2]==='-remove-authors'){
  removeAuthors()
}