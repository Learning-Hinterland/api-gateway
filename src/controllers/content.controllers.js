const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);

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

        const { status, data } = error.response;
        return res.status(status).json(data);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

// endpoint get content by id
async function getContentById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/contents/${req.params.id}`);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
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

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

async function markContentWatched(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/watch`, req.body);
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

async function likeContent(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/like`, req.body);
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

async function unlikeContent(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/unlike`, req.body);
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

async function commentContent(req, res, next) {
    try {
        let { status, data } = await api.post(`/api/contents/${req.params.id}/comment`, req.body);
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

module.exports = { createContent, getContents, getContentById, updateContent, deleteContent, markContentWatched, likeContent, unlikeContent, commentContent };