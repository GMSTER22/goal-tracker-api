const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllComments = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description = 'Endpoint to get all comments'
  try {
    const result = await mongodb.getDb().collection('comments').find();
    const comments = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(comments);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getOneComment = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description = 'Endpoint to get a single comment'
  try {
    const commentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('comments').find({ _id: commentId });
    const comments = await result.toArray();
    
    if (comments.length === 0) {
      // If comment with the specified ID is not found
      res.status(404).json({ error: 'comment not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(comments[0]);
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const createComment = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description = 'Endpoint for creating a new comment'
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a comment',
    require: true,
    schema: {
      $userId: '65275353941bfccbf0de1135',
      $goalId: '652757fd941bfccbf0de1144',
      $text: 'I am doing pretty good on my goal',
      $createdAt: '10/13/2023'
    }
  }
  */
  try {
    const comment = {
      userId: req.body.userId,
      goalId: req.body.goalId,
      text: req.body.text,
      createdAt: req.body.createdAt
    };
    const response = await mongodb.getDb().collection('comments').insertOne(comment);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the new comment');
    }
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description = 'Endpoint for updating a comment'
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Update a comment',
    require: true,
    schema: {
      $userId: '65275353941bfccbf0de1135',
      $goalId: '652757fd941bfccbf0de1144',
      $text: 'I am struggling with my goal',
      $createdAt: '10/13/2023'
    }
  }
  */
  try {
    const commentId = new ObjectId(req.params.id);
    const comment = {
      userId: req.body.userId,
      goalId: req.body.goalId,
      text: req.body.text,
      createdAt: req.body.createdAt
    };
    const response = await mongodb
      .getDb()
      .collection('comments')
      .replaceOne({ _id: commentId }, comment);
    if (response.modifiedCount > 0) {
      // If category is updated send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while updating the comment');
    }
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description = 'Endpoint for deleting a comment'
  try {
    const commentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('comments').deleteOne({ _id: commentId });
    if (response.deletedCount > 0) {
      // If comment is deleted send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while deleting the comment');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllComments,
  getOneComment,
  createComment,
  updateComment,
  deleteComment
};
