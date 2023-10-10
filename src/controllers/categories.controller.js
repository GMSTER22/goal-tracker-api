const express = require('express');
const app = express();
const mongodb = require('../database/database');

const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {
    try {
        //#swagger.tags=['Categories']
        const result = await mongodb.getDatabase().db().collection('categories').find();
        const categories = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOneCategory = async (req, res) => {
    try {
        //#swagger.tags=['Categories']
        const categoryId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('categories').find({ _id: categoryId });
        const categories = await result.toArray();

        if (categories.length === 0) {
            // If categorie with the specified ID is not found
            res.status(404).json({ error: 'categorie not found' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCategory = async (req, res, next) => {
    try {
        const category = {
            userId: req.body.userId,
            categoryName: req.body.categoryName
        };
        const response = await mongodb.getDatabase().db().collection('categories').insertOne(category);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the new category');
        }
    } catch (error) {
        next(error);
    }
};