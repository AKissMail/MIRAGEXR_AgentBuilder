<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/authentication/', {
          username: this.username,
          password: this.password
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
        await this.loadConfigurations(token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = 'Login failed. Please check your username and password.';
      }
    },
    async loadConfigurations(token) {
      try {
        const response = await axios.get('http://localhost:8000/options/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        const ragConfig = response.data.find(config => config.ragConfig).ragConfig;
        localStorage.setItem('ragConfig', JSON.stringify(ragConfig));
      } catch (error) {
        console.error('Error loading configurations:', error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.login h1 {
  color: #360a6f;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login form > div {
  margin-bottom: 1em;
}

.login label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.login input {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

.login button {
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: #41e4fe;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.login button:hover {
  background-color: #11aec7;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
