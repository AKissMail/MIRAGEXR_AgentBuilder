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
import { login, loadConfigurations } from './authentication';

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
      const token = await login(this.username, this.password);
      if (token) {
        this.$router.push('/dashboard');
        await loadConfigurations(token);
      } else {
        this.error = 'Login failed. Please check your username and password.';
      }
    },
  }
};
</script>

<style scoped>
h1, label{
  font-family: 'Roboto', sans-serif
}
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
  background-color: rgba(4, 11, 59, 0.73);
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.login button:hover {
  background-color: #0f1f8f;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
