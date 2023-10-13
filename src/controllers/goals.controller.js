const express = require('express');
const app = express();
const mongodb = require('../database/database');

const ObjectId = require('mongodb').ObjectId;

const getAllGoals = async (req, res) => {
    try {
        //#swagger.tags=['Goals']
        //#swagger.description = 'Endpoint to get all users'
        const result = await mongodb.getDb().collection('goals').find();
        const goals = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOneGoal = async (req, res) => {
    try {
        //#swagger.tags=['Goals']
        //#swagger.description = 'Endpoint to get a single goal'
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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createGoal = async (req, res, next) => {
    try {
        //#swagger.tags=['Goals']
        //#swagger.description = 'Endpoint for creating a new goal'
        /*
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a Goal',
            require: true,
            schema: {
                $userId: '65275353941bfccbf0de1135',
                $categoryId: '6527678ff7fe385cf16b10a4'
                $title: "Eat more Carrots",
                $description: 'I need to eat more carrots.',
                $startDate: '10/13/2023',
                $dueDate: '12/13/2023',
                $progress: 10
            }
        }
        */
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
        next(error);
    }
};

module.exports = {
    getAllGoals,
    getOneGoal,
    createGoal
}