const {
    USER_SERVICE_URL
} = process.env;

const axios = require('../libs/axios');
const api = axios(USER_SERVICE_URL);

async function getUsersMap() {
    try {
        let { data } = await api.get('/api/users');

        let usersMap = new Map();
        data.data.forEach(user => {
            if (!usersMap.has(user.id)) {
                usersMap.set(user.id, user);
            }
        });

        return usersMap;
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports = { getUsersMap };