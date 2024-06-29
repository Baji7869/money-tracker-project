// routes/index.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET home page
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.render('index', { transactions });
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Error fetching transactions');
    }
});

// GET add transaction page
router.get('/add', (req, res) => {
    res.render('addTransaction');
});

// POST add transaction
router.post('/add', async (req, res) => {
    const { type, amount, description } = req.body;
    const transaction = new Transaction({ type, amount, description, date: new Date() });
    try {
        await transaction.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving transaction:', err);
        res.status(500).send('Error saving transaction');
    }
});

// POST delete transaction
router.post('/delete/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting transaction:', err);
        res.status(500).send('Error deleting transaction');
    }
});

module.exports = router;
