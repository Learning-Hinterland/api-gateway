const {
    USER_SERVICE_URL,
    JWT_SECRET,
} = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('../libs/axios');
const api = axios(USER_SERVICE_URL);

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        let { data } = await api.get(`/api/users?email=${email}`);
        if (!data.data[0]) {
            return res.status(400).json({
                status: false,
                status: 'error',
                message: 'user not found',
                data: null
            });
        }

        let user = data.data[0];
        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                status: 'error',
                message: 'invalid password',
                data: null
            });
        }

        delete user.password; // remove password from response
        if (user.role == 'ROLE_STUDENT') {
            delete user.lecturer_id; // remove lecturer_id from student
        } else if (user.role == 'ROLE_LECTURER') {
            delete user.student_id; // remove student_id from lecturer
        } else {
            delete user.student_id; // remove student_id from admin
            delete user.lecturer_id; // remove lecturer_id from admin
        }

        let token = jwt.sign(user, JWT_SECRET);

        return res.json({
            status: true,
            message: 'login success',
            error: null,
            data: {
                ...user,
                token
            }
        });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: false,
                message: 'service unavailable',
                error: null,
                data: null
            });
        }

        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            next(error);
        }
    }
}

async function me(req, res, next) {
    return res.json({
        status: true,
        message: 'user data',
        error: null,
        data: req.user
    });
}

module.exports = { login, me };