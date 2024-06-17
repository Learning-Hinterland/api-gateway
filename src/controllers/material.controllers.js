const {
    COURSE_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(COURSE_SERVICE_URL);

async function createMaterial(req, res, next) {
    try {
        let { status, data } = await api.post('/api/materials', req.body);
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
async function getMaterials(req, res, next) {
    try {
        const query = req.query;
        let { status, data } = await api.get('/api/materials', { params: query });
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
async function getMaterialById(req, res, next) {
    try {
        let { status, data } = await api.get(`/api/materials/${req.params.id}`);
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
async function updateMaterial(req, res, next) {
    try {
        let { status, data } = await api.put(`/api/materials/${req.params.id}`, req.body);
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
async function deleteMaterial(req, res, next) {
    try {
        let { status, data } = await api.delete(`/api/materials/${req.params.id}`);
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

module.exports = { createMaterial, getMaterials, getMaterialById, updateMaterial, deleteMaterial };