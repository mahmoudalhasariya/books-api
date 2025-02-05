const express = require('express');
const booksPath = require('./routes/books')
const authorsPath = require('./routes/authors')
const authPath = require('./routes/auth')
const logger = require('./middlewares/logger')
const usersPath = require('./routes/users')
const { notFound, errorHandler } = require('./middlewares/errors')
const dotenv = require('dotenv');// استيراد المكتبة dotenv وهي عبارة عن مكتبة تساعد في تحميل المتغيرات البيئية
const connectToDb = require('./config/db');
dotenv.config()//هذه التعليمة تجعل التطبيق يقرأ القيم الموجودة في ملف .env، ويدرجها في process.env، مما يسمح لك بالوصول إلى هذه القيم عبر process.env.VARIABLE_NAME.
const path=require('path')
const helmet=require('helmet')
const cors =require('cors')

// Connection To Database
connectToDb()

// Init App
const app = express(); // لكي نستطيع استخدام http Methode (get post put delete)
 
// Static Folder

app.use(express.static(path.join(__dirname,'images')))

//Applay Middleware
app.use(express.json());// من اجل تحويل ملفات جيسون الى جافا سكريبت اوبجيكت لكي يفهمها اكسبريس
app.use(express.urlencoded({extended:false}))
app.use(logger)

// Helmet
app.use(helmet())// زيادة امان ل اكسبريس

// Cors يسمح للموقع الأمامي (Frontend) بالتواصل مع الـ API حتى لو كانا على نطاقين مختلفين.
app.use(cors()) 

// Set view Engine
app.set('view engine','ejs')

// Routers
app.use('/api/books', booksPath)
app.use('/api/authors', authorsPath)
app.use('/api/auth', authPath)
app.use('/api/users', usersPath)
app.use('/api/upload',require('./routes/upload'))
app.use('/password',require('./routes/password'))
// Error Handler Middleware
// error handler تكتب دائما بعد الروت
app.use(notFound);
app.use(errorHandler)

// Running the server
const port = process.env.PORT ;
app.listen(port, () => console.log(`The is server Running ${process.env.NODE_ENV} mode on port ${port}`))


