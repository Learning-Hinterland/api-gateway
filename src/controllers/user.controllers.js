const {
    USER_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(USER_SERVICE_URL);

async function getUsers(req, res, next) {
    try {
        const { search, role } = req.query;

        let query = '';
        if (search) query += `?search=${search}`;
        if (role) query += `${query ? '&' : '?'}role=${role}`;

        let { data } = await api.get(`/api/users${query}`);
        let users = [];
        if (data.data) {
            users = data.data;
        }

        return res.json({
            status: true,
            message: 'Successfully retrieved users',
            error: null,
            data: users
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

async function getUserById(req, res, next) {
    try {
        const { id } = req.params;

        let { data } = await api.get(`/api/users/${id}`);

        return res.json({
            status: true,
            message: 'Successfully retrieved user',
            error: null,
            data: data.data
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

async function createUser(req, res, next) {
    try {
        const { name, email, role, password } = req.body;

        let { status, data } = await api.post('/api/users', {
            name,
            email,
            role,
            password
        });

        return res.status(status).json(data);
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

module.exports = { getUsers, getUserById, createUser };