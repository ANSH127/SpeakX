# SpeakX Project

This project consists of a REST server, a gRPC server, and a client application built with React. The project is designed to manage and display questions and answers.

## REST Server

The REST server is built with Express and MongoDB. It provides endpoints to manage questions.

### Endpoints

- `GET /questions`: Fetches a list of questions.
- `GET /questions/search`: Searches for questions by title.

### Setup

1. Navigate to the `rest_server` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI: `MONGO_URI=your_mongo_uri`
4. Start the server: `npm start`

## gRPC Server

The gRPC server is built with Node.js and MongoDB. It provides RPC methods to manage questions.

### RPC Methods

- `GetQuestions`: Fetches a list of questions.
- `GetQuestionsByTitle`: Searches for questions by title.

### Setup

1. Navigate to the `grpc_server` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB URI: `MONGO_URI=your_mongo_uri`
4. Start the server: `node server.js`

## Client Application

The client application is built with React. It interacts with the REST server to display questions and answers.

### Setup

1. Navigate to the `client` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
