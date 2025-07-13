const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
title: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String },
location: { type: String },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
imageUrl: { type: String, default: '' },
}, { timestamps: true });


itemSchema.index({ title: 'text', description: 'text' });


module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);
