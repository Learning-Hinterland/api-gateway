const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);
let { getUsersMap } = require('../utils/users');

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

        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            next(error);
        }
    }
}

// endpoint get all contents
async function getCourses(req, res, next) {
    try {
        const query = req.query;
        let { status, data } = await api.get('/api/courses', { params: { ...query, user_id: req.user.id } });

        let usersMap = await getUsersMap();
        data.data = data.data.map(content => {
            if (content.lecturer && content.lecturer.id) {
                content.lecturer.name = usersMap.get(content.lecturer.id).name;
            }
            return content;
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

// endpoint get content by id
async function getCourseById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/courses/${req.params.id}`, { params: { user_id: req.user.id } });

        let usersMap = await getUsersMap();
        if (data.data.lecturer && data.data.lecturer.id) {
            data.data.lecturer.name = usersMap.get(data.data.lecturer.id).name;
        }
        data.data.materials.forEach(material => {
            material.contents.forEach(content => {
                content.comments = content.comments.filter(comment => {
                    let userExist = usersMap.get(comment.user.id);
                    if (userExist) {
                        comment.user.name = userExist.name;
                        return true;
                    }
                    return false;
                });
            });
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

        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            next(error);
        }
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

        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            next(error);
        }
    }
}

async function enrollCourse(req, res, next) {
    try {
        console.log("req.params.id", req.params.id);
        let { status, data } = await api.post(`/api/courses/${req.params.id}/enroll`, {}, { params: { user_id: req.user.id } });
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

        console.log("error.response", error);
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

async function unenrollCourse(req, res, next) {
    try {
        let { status, data } = await api.delete(`/api/courses/${req.params.id}/unenroll`, { params: { user_id: req.user.id } });
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

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, enrollCourse, unenrollCourse };