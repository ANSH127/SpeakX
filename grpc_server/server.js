require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Question = require('./models/questionModel');
const packageDefinition = protoLoader.loadSync("questions.proto", {});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const questionsPackage = protoDescriptor.questions;

const getQuestions = async (call, callback) => {
    const { page = 1, limit = 20, questionType } = call.request;
    const skip = (page - 1) * limit;
    try {
        const query = questionType && questionType !== 'ALL' ? { type: questionType } : {};
        const questions = await Question.find(query).skip(skip).limit(limit);
        const total = await Question.countDocuments(query);
        callback(null, { questions, total });
    } catch (error) {
        callback(error);
    }
};

const getQuestionsByTitle = async (call, callback) => {
    const { title, page = 1, limit = 20, questionType } = call.request;
    const skip = (page - 1) * limit;
    try {
        const query = {
            title: title ? { $regex: title, $options: 'i' } : {},
            type: questionType && questionType !== 'ALL' ? questionType : { $exists: true },
        };
        const questions = await Question.find(query).skip(skip).limit(limit);
        const total = await Question.countDocuments(query);
        callback(null, { questions, total });
    } catch (error) {
        callback(error);
    }
};

const server = new grpc.Server();
server.addService(questionsPackage.QuestionService.service, {
    getQuestions,
    getQuestionsByTitle,
});

const PORT = '0.0.0.0:50051';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server running at ${PORT}`);
    // server.start();
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Error connecting to the database', error);
});




