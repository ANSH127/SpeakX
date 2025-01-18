const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    // console.log(page, limit);
    
    const skip = (page - 1) * limit;
    try {
        const questions = await Question.find().skip(skip).limit(limit);
        const total = await Question.countDocuments();

        res.json({
            questions,
            total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getQuestionsByTitle = async (req, res) => {
    try {
        const { title, page = 1, limit = 20 } = req.query;
        // console.log(title);

        const skip = (page - 1) * limit;
        const query = title ? { title: new RegExp(title, 'i') } : {}; // Case-insensitive search
        const questions = await Question.find(query).skip(skip).limit(limit);
        const total = await Question.countDocuments(query);

        res.json({
            questions, total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}





module.exports = {
    getQuestions,
    getQuestionsByTitle
}

