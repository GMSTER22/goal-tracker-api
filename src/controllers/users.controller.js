const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint to get all users'
  try {
    const result = await mongodb.getDb().collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while retrieving all Users' });
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint to get a single user by id'
  try {
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
    res.status(500).json({ error: 'Some error ocurred while retrieving this User' });
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint to get a single user by email'
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
    res.status(500).json({ error: 'Some error ocurred while retrieving this User by email' });
    next(error);
  }
};

const createUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint for creating a new user'
  /*
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Add a User',
      require: true,
      schema: {
        $googleId: '123989823749234',
        $displayName: 'Joe Bobson',
        $firstName: 'Joe',
        $lastName: 'Bobson',
        $email: 'joe.bobson@gmail.com',
        $image: 'https://lh3.googleusercontent.com/a/ACg8ocLLFaifw_TT1jjw0E6SX-JzO0_ru4…'
      }
    }
  */
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const user = {
      googleId: req.body.googleId,
      displayName: req.body.displayNameName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.body.image
    };
    const response = await mongodb.getDb().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the new user');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while creating the new User' });
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint for updating a user'
  /*
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Update a User',
      require: true,
      schema: {
        $firstName: 'Jane',
        $lastName: 'Doe',
        $email: 'jane.doe@gmail.com'
      }
    }
  */
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    const response = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      // If category is updated send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while updating this User' });
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description = 'Endpoint for deleting a user'
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      // If comment is deleted send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while deleting the user');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while deleting this User' });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};
