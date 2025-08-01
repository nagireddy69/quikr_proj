const Product = require("../Models/product.model");
const uploadOnCloudinary = require("../Utils/uploadOnCloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      location,
      usedFrom,
      usedTo,
      distance,
      availability,
    } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        imageUrl = uploadResult.secure_url;
      } else {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const product = new Product({
      name,
      category,
      price,
      location,
      usedFrom,
      usedTo,
      distance,
      availability,
      image: imageUrl,
      postedBy: req.userId,
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("postedBy", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("postedBy", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ postedBy: req.userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      location,
      usedFrom,
      usedTo,
      distance,
      availability,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    let imageUrl = product.image;

    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        imageUrl = uploadResult.secure_url;
      }
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.location = location || product.location;
    product.usedFrom = usedFrom || product.usedFrom;
    product.usedTo = usedTo || product.usedTo;
    product.distance = distance || product.distance;
    product.availability = availability !== undefined ? availability : product.availability;
    product.image = imageUrl;

    await product.save();
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) return res.status(400).json({ message: "Category query parameter is required" });

    const products = await Product.find({ category: { $regex: category, $options: "i" } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
  searchByCategory
};
