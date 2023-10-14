const mongodb = require('../database/database');

const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  try {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOneUser = async (req, res) => {
  try {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    const users = await result.toArray();

    if (users.length === 0) {
      // If user with the specified ID is not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserByEmail = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const email = req.params.email;
    const result = await mongodb.getDb().collection('users').findOne({ email });

    if (!result) {
      // If user with the specified email is not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    const response = await mongodb.getDb().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the new user');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getUserByEmail,
  createUser
};
