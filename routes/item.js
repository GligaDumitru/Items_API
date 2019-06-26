const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  // Return all items
  const items = Item.find({}, (err, items) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        items
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const itemToDel = Item.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.status(400).json({
        message: "Item was with problem"
      });
    } else {
      res.status(200).json({
        message: "Item was deleted"
      });
    }
  });
});

// Get Item By Id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const item = Item.findById(id, (err, item) => {
    if (err) {
      res.status(400).json({
        message: "Invalid Request",
        errorMessage: err.message
      });
    } else {
      res.status(200).json({
        item
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const { name, image, description, amount } = req.body;
  const newItem = new Item({
    name,
    image,
    description,
    amount
  });

  newItem.save(err => {
    if (err) {
      res.status(400).json({
        message: "The item was not found",
        errorMessage: err.message
      });
    } else {
      res.status(201).json({
        message: "Item was saved successfuly"
      });
    }
  });
});

router.put("/:id", (req, res, next) => {
  const { name, description, amount, image } = req.body;
  const updateItem = Item.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name, description, amount, image }
    },
    (err, item) => {
      if (err) {
        res.status(400).json({
          message: "The item was not saved",
          errorMessage: err.message
        });
      } else {
        res.status(200).json({
          message: "Item was updated successfully",
          item
        });
      }
    }
  );
});

module.exports = router;
