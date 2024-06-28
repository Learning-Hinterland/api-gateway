const {
    USER_SERVICE_URL,
    JWT_SECRET,
    FRONT_END_URL
} = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let sendMail = require('../libs/nodemailer');
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

async function forgotPassword(req, res, next) {
    try {
        let { email } = req.body;
        let { data } = await api.get(`/api/users?email=${email}`);
        // if data exist, send email
        if (data.data[0]) {
            let user = data.data[0];
            let token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            // send email
            let url = `${req.protocol}://${req.get('host')}/api/auth/reset-password?token=${token}`;
            sendMail(user.name, user.email, url);
        }

        return res.json({
            status: true,
            message: 'We will send you an email if the email is registered',
            error: null,
            data: null
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

async function resetPassword(req, res, next) {
    try {
        let { token } = req.query;
        let { password, confirm_password } = req.body;
        if (password != confirm_password) {
            return res.redirect(`/api/auth/reset-password?token=${token}&error=${encodeURIComponent('password not match')}`);
        }

        let decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.redirect(`/api/auth/reset-password?token=${token}&error=${encodeURIComponent('invalid token')}`);
        }

        let { data } = await api.get(`/api/users/${decoded.id}`);
        if (!data.data) {
            return res.redirect(`/api/auth/reset-password?token=${token}&error=${encodeURIComponent('user not found')}`);
        }

        let user = data.data;
        await api.put(`/api/users/${user.id}`, {
            ...user,
            password
        });

        let loginUrl = `${FRONT_END_URL}/login`;
        console.log("loginUrl", loginUrl);
        res.render('reset-password-success', { login_url: loginUrl });
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

async function updatePassword(req, res, next) {
    try {
        const { user_id, old_password, new_password } = req.body;

        let { data } = await api.get(`/api/users/${user_id}`);
        if (!data.data) {
            return res.status(400).json({
                status: false,
                message: 'user not found',
                error: null,
                data: null
            });
        }

        let user = data.data;
        if (user.id !== req.user.id && req.user.role !== 'ROLE_ADMIN') {
            return res.status(403).json({
                status: false,
                message: 'forbidden access',
                error: null,
                data: null
            });
        }

        if (user.id == req.user.id) {
            if (old_password == new_password) {
                return res.status(400).json({
                    status: false,
                    message: 'old password and new password must be different',
                    error: null,
                    data: null
                });
            }

            let isPasswordMatch = await bcrypt.compare(old_password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid old password',
                    error: null,
                    data: null
                });
            }
        }
        

        await api.put(`/api/users/${user.id}`, {
            ...user,
            password: new_password
        });

        return res.json({
            status: true,
            message: 'Successfully updated password',
            error: null,
            data: null
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

module.exports = { login, me, forgotPassword, resetPassword, updatePassword };