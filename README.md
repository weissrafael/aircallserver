# Aircall Chat Server

Welcome to the Aircall Chat server!

This repository contains the backend code for the Chat app, developed by me (Rafael Weiss) only to showcase my code and my abilities.
## Installation

In order to run the app locally, you need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.

Besides that, you will need to run the [frontend](https://github.com/weissrafael/aircallchat) locally as well.

After that, install the dependencies by running the following command in the project directory:

### `npm install`

In the project directory, you can run:

### `node server.js`

This will start the server on [http://localhost:3001](http://localhost:3001).

## Server Endpoints
- get /user
- get /user/:userId/conversation
- get /user/:userId/conversation/:conversationId
- get /user/:userId/conversation/:conversationId/message
- post /user/:userId/conversation
- post /user/:userId/conversation/:conversationId/message
- post /signup
- post /login