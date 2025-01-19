const Question = require('../models/questionModel');

const getQuestions = async (req, res) => {
    const { page = 1, limit = 20, questionType } = req.query;
    // console.log(page, limit);
    const skip = (page - 1) * limit;
    try {
        const query = questionType && questionType != "ALL" ? { type: questionType } : {};
        const questions = await Question.find(query).skip(skip).limit(limit);
        const total = await Question.countDocuments(query);

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
        const { title, page = 1, limit = 20, questionType } = req.query;
        // console.log(title);
        console.log(questionType);

        const skip = (page - 1) * limit;
        const query={
            title:title?{$regex:title,$options:'i'}:{},
            type:questionType && questionType != "ALL" ? questionType : { $exists: true}
        }
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

