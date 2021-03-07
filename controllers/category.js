const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
   Category.findById(id).exec((err, ctgry) => {
      if (err) {
         return res.status(400).json({
            error: "Category not found in DataBase",
         });
      }
      req.category = ctgry;
      next();
   });
};

exports.createCategory = (req, res) => {
   const category = new Category(req.body);
   category.save((err, category) => {
      if (err) {
         return res.status(400).json({
            error: "Not able to save category in Database",
         });
      }
      res.json({ category });
   });
};

exports.getCategory = (req, res) => {
   return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
   Category.find().exec((err, categories) => {
      if (err) {
         return res.status(400).json({
            error: "There are no Categories",
         });
      }
      res.json(categories);
   });
};

exports.updateCategory = (req, res) => {
   const category = req.category;
   category.name = req.body.name;
   category.save((err, updatedCategory) => {
      if (err) {
         return res.status(400).json({
            error: "Not able to Update Category",
         });
      }
      res.json(updatedCategory);
   });
};

exports.deleteCategory = (req, res) => {
   const category = req.category;
   category.remove((err, deletedcategory) => {
      if (err) {
         return res.status(400).json({
            error: "Not able to delete category",
         });
      }
      res.json({
         message: `Successfully deleted ${deletedcategory.name} category`,
      });
   });
};
