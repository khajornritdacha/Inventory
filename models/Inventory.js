const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    items: [{
        item_name: String,
        item_loc: String
    }],
    owners: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;