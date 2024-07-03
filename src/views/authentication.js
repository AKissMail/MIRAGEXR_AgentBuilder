import axios from 'axios';

export async function login(username, password) {
    try {
        const response = await axios.post('http://localhost:8000/authentication/', {
            username: username,
            password: password
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
        await loadConfigurations(token);

        return token;
    } catch (error) {
        console.error('Login failed. Please check your username and password.');
        return null;
    }
}

export async function loadConfigurations(token) {
    try {
        const response = await axios.get('http://localhost:8000/options/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        const thinkModels = response.data.filter(config => config.endpointName === "think/");
        localStorage.setItem('thinkModels', JSON.stringify(thinkModels));

        const ragConfig = response.data.find(config => config.ragConfig).ragConfig;
        localStorage.setItem('ragConfig', JSON.stringify(ragConfig));
    } catch (error) {
        console.error('Error loading configurations:', error);
    }
}