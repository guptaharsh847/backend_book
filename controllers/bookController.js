const Book = require('../models/Book');
const { uploadImageToCloudinary } = require('../utils/cloudinary');

// exports.createBook = async (req, res) => {
//   try {
//     const { title, author, genre, publicationYear, isRead, coverImage } = req.body;

//     console.log("Received coverImage type:", typeof coverImage);

//     let imageUrl = '';

//     if (coverImage && typeof coverImage === 'string' && coverImage.startsWith('data:image')) {
//       imageUrl = await uploadImageToCloudinary(coverImage);
//     }

//     // ✅ Set default image if imageUrl is still empty (i.e., no upload happened)
//     if (!imageUrl) {
//       imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';
//     }

//     const newBook = new Book({
//       title,
//       author,
//       genre,
//       publicationYear,
//       isRead,
//       coverImage: imageUrl,
//     });

//     const saved = await newBook.save();
//     res.status(201).json(saved);

//   } catch (error) {
//     console.error("Error in createBook:", error);
//     res.status(500).json({ message: 'Failed to add book', error: error.message });
//   }
// };

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear, isRead, coverImage } = req.body;

    let imageUrl = '';

   if (coverImage && typeof coverImage === 'string') {
  if (coverImage.startsWith('data:image')) {
    try {
      // console.log("⏫ Uploading base64 image to Cloudinary...");
      imageUrl = await uploadImageToCloudinary(coverImage);
      // console.log("✅ Cloudinary upload success:", imageUrl);
    } catch (uploadError) {
      console.error("❌ Cloudinary upload failed:", uploadError.message);
      return res.status(500).json({
        message: "Image upload to Cloudinary failed",
        error: uploadError.message
      });
    }
  } else if (coverImage.startsWith('http')) {
    // console.log("🌐 Using direct image URL");
    imageUrl = coverImage;
  }
}


    if (!imageUrl) {
      imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg';
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publicationYear,
      isRead,
      coverImage: imageUrl
    });

    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error in createBook:', error);
    res.status(500).json({ message: 'Failed to add book', error: error.message });
  }
};
exports.getBooks = async (req, res) => {
try {
const { title, author, genre, publicationYear } = req.query;
const filter = {};
if (title) filter.title = new RegExp(title, 'i');
if (author) filter.author = new RegExp(author, 'i');
if (genre) filter.genre = new RegExp(genre, 'i');
if (publicationYear) filter.publicationYear = Number(publicationYear);

 
const books = await Book.find(filter);
res.json(books);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getBook = async (req, res) => {
try {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: 'Book not found' });
res.json(book);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.updateBook = async (req, res) => {
try {
const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!updated) return res.status(404).json({ message: 'Book not found' });
res.json(updated);
} catch (error) {
res.status(400).json({ message: error.message });
}
};

exports.deleteBook = async (req, res) => {
try {
const deleted = await Book.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: 'Book not found' });
res.json({ message: 'Book deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};



