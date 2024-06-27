const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);
let { getUsersMap } = require('../utils/users');

async function createAssignment(req, res, next) {
    try {
        let { status, data } = await api.post('/api/assignments', req.body, { params: { user_id: req.user.id } });
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

async function getAssignments(req, res, next) {
    try {
        let { status, data } = await api.get('/api/assignments', { params: req.query });
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

async function getAssignmentById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/assignments/${req.params.id}`, { params: { user_id: req.user.id } });

        let usersMap = await getUsersMap();
        data.data.submissions.forEach(submission => {
            let userExist = usersMap.get(submission.user_id);
            if (userExist) {
                submission.user_name = userExist.name;
            }
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

async function submitAssignment(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/assignments/${req.params.id}/submit`, req.body, { params: { user_id: req.user.id } });
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

module.exports = { createAssignment, getAssignments, getAssignmentById, submitAssignment };