const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userRouter = require('../routers/users-router');
const adminRouter = require('../routers/admin-router');
const volunteerRouter = require('../routers/volunteers-router');
const studentRouter = require('../routers/students-router');

const server = express();
server.use(cookieParser());
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/auth', userRouter);
server.use('/dashboard', adminRouter);
server.use('/dashboard', volunteerRouter);
server.use('/dashboard', studentRouter);
// server.use('/api/auth', authRouter);
// server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
