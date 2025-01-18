const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().skip(200).limit(100);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuestions
}

