const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res, next) => {
  //#swagger.tags=['Categories']
  //#swagger.description = 'Endpoint to get all categories'
  try {
    const result = await mongodb.getDb().collection('categories').find();
    const categories = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getOneCategory = async (req, res, next) => {
  //#swagger.tags=['Categories']
  //#swagger.description = 'Endpoint to get a single category'
  try {
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('categories').find({ _id: categoryId });
    const categories = await result.toArray();

    if (categories.length === 0) {
      // If categorie with the specified ID is not found
      res.status(404).json({ error: 'categorie not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(categories[0]);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  //#swagger.tags=['Categories']
  //#swagger.description = 'Endpoint for creating a new category'
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a category',
    require: true,
    schema: {
      $userId: '65275353941bfccbf0de1135',
      $categoryName: 'School'
    }
  }
  */
  try {
    const category = {
      userId: req.body.userId,
      categoryName: req.body.categoryName
    };
    const response = await mongodb.getDb().collection('categories').insertOne(category);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the new category');
    }
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  //#swagger.tags=['Categories']
  //#swagger.description = 'Endpoint for updating a category'
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Update a category',
    require: true,
    schema: {
      $userId: '65275353941bfccbf0de1135',
      $categoryName: 'School'
    }
  }
  */
  try {
    const categoryId = new ObjectId(req.params.id);
    const category = {
      userId: req.body.userId,
      categoryName: req.body.categoryName
    };
    const response = await mongodb
      .getDb()
      .collection('categories')
      .replaceOne({ _id: categoryId }, category);
    if (response.modifiedCount > 0) {
      // If category is updated send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while updating the category');
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  //#swagger.tags=['Categories']
  //#swagger.description = 'Endpoint for deleting a category'
  try {
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('categories').deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
      // If category is deleted send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while deleting the category');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
