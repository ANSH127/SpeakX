const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;

    const skip = (page - 1) * limit;
    try {
        const questions = await Question.find().skip(skip).limit(limit);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuestions
}

