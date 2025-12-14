// backend/routes/adminRoutes.js
const express = require('express');
const multer = require('multer');
const { addSweet, updateSweet, deleteSweet, getAllSweetsAdmin } = require('../controllers/adminController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/sweet', upload.single('image'), addSweet);
router.put('/sweet/:id', upload.single('image'), updateSweet);
router.delete('/sweet/:id', deleteSweet);
router.get('/sweets', getAllSweetsAdmin);

module.exports = router;   // <-- CommonJS export
