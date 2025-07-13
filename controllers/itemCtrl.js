const Item = require("../models/item");

exports.getItems = async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    
    // filter only if search is non‑empty
    let filter = {};
    if (typeof search === "string" && search.trim().length > 0) {
      // case-insensitive substring match on `name`
      filter = { title: { $regex: search.trim(), $options: 'i' } };
    }

    const items = await Item
      .find(filter)
      .populate("createdBy", "name email")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    return res.json(items);
  } catch (error) {
    console.error("❌ [getItems] error:", error);
    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};


exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    let userId;
    
    if (req.user) {
      userId = req.user._id;
    } else if (req.body.userEmail) {
      const User = require('../models/user');
      let user = await User.findOne({ email: req.body.userEmail });
      
      if (!user) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('oauth-placeholder', 10);
        user = new User({
          name: req.body.userName || 'OAuth User',
          email: req.body.userEmail,
          password: hashedPassword
        });
        await user.save({ validateBeforeSave: false });
      }
      userId = user._id;
    } else {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    let itemData = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
      createdBy: userId,
    };
    
    if (req.file) {
      itemData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const item = await Item.create(itemData);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    if (item.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    if (item.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    await Item.deleteOne({ _id: req.params.id });
    res.json({ message: "Item deleted" });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: error.message });
  }
};
