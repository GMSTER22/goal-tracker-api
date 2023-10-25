const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGoals = async (req, res, next) => {
  //#swagger.tags=['Goals']
  //#swagger.description = 'Endpoint to get all goals'
  try {
    const result = await mongodb.getDb().collection('goals').find();
    const goals = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while retrieving All the Goals' });
    next(error);
  }
};

const getOneGoal = async (req, res, next) => {
  //#swagger.tags=['Goals']
  //#swagger.description = 'Endpoint to get a single goal'
  try {
    const goalId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('goals').find({ _id: goalId });
    const goals = await result.toArray();

    if (goals.length === 0) {
      // If goal with the specified ID is not found
      res.status(404).json({ error: 'goal not found' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(goals[0]);
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while retrieving this Goal' });
    next(error);
  }
};

const createGoal = async (req, res, next) => {
  //#swagger.tags=['Goals']
  //#swagger.description = 'Endpoint to create a goal'
  /*
    #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Add a Goal',
    require: true,
        schema: {
            $userId: '65275353941bfccbf0de1135',
            $categoryId: '6527678ff7fe385cf16b10a4',
            $title: 'Eat more Carrots',
            $description: 'I need to eat more carrots.',
            $startDate: '2023-10-13',
            $dueDate: '2023-12-13',
            $progress: 10
        }
    }
  */
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const goal = {
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      progress: req.body.progress
    };
    const response = await mongodb.getDb().collection('goals').insertOne(goal);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the new goal');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while creating this new goal' });
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  //#swagger.tags=['Goals']
  //#swagger.description = 'Endpoint to update a goal'
  /*
    #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Update a goal',
    require: true,
        schema: {
            $userId: '65275353941bfccbf0de1135',
            $categoryId: '6527678ff7fe385cf16b10a4',
            $title: 'Study the Scriptures',
            $description: 'I need to study the scriptures more often.',
            $startDate: '2023-10-14',
            $dueDate: '2023-12-13',
            $progress: 10
        }
    }
  */
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const goalId = new ObjectId(req.params.id);
    const goal = {
      userId: req.body.userId,
      title: req.body.title,
      categoryId: req.body.categoryId,
      description: req.body.description,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      progress: req.body.progress
    };
    const response = await mongodb.getDb().collection('goals').replaceOne({ _id: goalId }, goal);
    if (response.modifiedCount > 0) {
      // If category is updated send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while updating the goal');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while updating this goal' });
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  //#swagger.tags=['Goals']
  //#swagger.description = 'Endpoint to delete a goal'
  try {
    const goalId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('goals').deleteOne({ _id: goalId });
    if (response.deletedCount > 0) {
      // If comment is deleted send s status 200
      res.status(204).send();
    } else {
      // If there was some error that prevented the update send a status 500 error
      res.status(500).json(response.error || 'Some error occurred while deleting the goal');
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error ocurred while deleting this new goal' });
    next(error);
  }
};

module.exports = {
  getAllGoals,
  getOneGoal,
  createGoal,
  updateGoal,
  deleteGoal
};
