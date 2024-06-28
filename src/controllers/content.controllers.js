const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);
let { getUsersMap } = require('../utils/users');

async function createContent(req, res, next) {
    try {
        let { status, data } = await api.post('/api/contents', req.body);
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
async function getContents(req, res, next) {
    try {
        const query = req.query;
        let { status, data } = await api.get('/api/contents', { params: query });
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
async function getContentById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/contents/${req.params.id}`, { params: { user_id: req.user.id } });

        let usersMap = await getUsersMap();

        data.data.comments.forEach(comment => {
            let userExist = usersMap.get(comment.user.id);
            if (userExist) {
                comment.user.name = userExist.name;
                return true;
            }
            return false;
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
async function updateContent(req, res, next) {
    try {
        let { status, data } = await api.put(`/api/contents/${req.params.id}`, req.body);
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
async function deleteContent(req, res, next) {
    try {
        let { status, data } = await api.delete(`/api/contents/${req.params.id}`);
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

async function markContentWatched(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/watch`, {}, { params: { user_id: req.user.id } });
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

async function likeContent(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/like`, {}, { params: { user_id: req.user.id } });
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

async function unlikeContent(req, res, next) {
    try {
        let { status, data } = await api.delete(`/api/contents/${req.params.id}/unlike`, { params: { user_id: req.user.id } });
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

async function commentContent(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/comment`, req.body, { params: { user_id: req.user.id } });
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

module.exports = { createContent, getContents, getContentById, updateContent, deleteContent, markContentWatched, likeContent, unlikeContent, commentContent };