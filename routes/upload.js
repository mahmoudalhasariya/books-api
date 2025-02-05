const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path') //لتعامل مع مسارات الملفات
const storage = multer.diskStorage({ //حدد أين سيتم حفظ الملفات المرفوعة.
    destination: function (req, file, cb) { // يحدد المجلد الذي سيتم حفظ الصور فيه
        cb(null, path.join(__dirname, '../images'))
    },
    filename: function (req, file, cb) { // يحفظ الصورة بنفس اسمها الأصلي
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const upload = multer({ storage: storage }) // إنشاء middleware لرفع الصور

router.post('/', upload.single('image'), (req, res) => { // هنا قمنا بتمرير الميديل وير مع دالة سينغل اي اننا نريد رفع صورة واحدة
    res.status(200).json({ message: 'images uploaded' })
})

module.exports = router;

/**
 *
الدالة toISOString()
 هي دالة مدمجة في JavaScript تستخدم لتحويل كائن التاريخ (Date) إلى سلسلة نصية (String) بتنسيق ISO 8601، وهو معيار دولي لتنسيق التاريخ والوقت.
 * ***/ 