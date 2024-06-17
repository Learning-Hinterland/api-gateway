const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);

async function createCourse(req, res, next) {
    try {
        let { status, data } = await api.post('/api/courses', { ...req.body, lecturer_id: req.user.id });
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

// endpoint get all contents
async function getCourses(req, res, next) {
    try {
        const query = req.query;
        let { status, data } = await api.get('/api/courses', { params: query });
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

// endpoint get content by id
async function getCourseById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/courses/${req.params.id}`);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

// endpoint update content by id
async function updateCourse(req, res, next) {
    try {
        let { status, data } = await api.put(`/api/courses/${req.params.id}`, req.body);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

// endpoint delete content by id
async function deleteCourse(req, res, next) {
    try {
        let { status, data } = await api.delete(`/api/courses/${req.params.id}`);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };