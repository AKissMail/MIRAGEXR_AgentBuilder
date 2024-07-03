<template>
  <div class="test-configuration">
    <h1>Test Configuration</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="model-select">Model</label>
        <select id="model-select" v-model="selectedModel" required>
          <option disabled value="">Please select one</option>
          <option v-for="config in configurations" :key="config.apiName" :value="config.apiName">{{ config.name }}</option>
        </select>
      </div>
      <div>
        <label for="teacher-prompt">Teacher Prompt</label>
        <input placeholder="Provide specific information about the task."  type="text" id="teacher-prompt" v-model="teacherPrompt" required>
      </div>
      <div>
        <label for="student-message">Student Message</label>
        <input placeholder="Test the model with a question!" type="text" id="student-message" v-model="studentMessage" required>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="responseMessage" class="response">
      <h2>Response from API:</h2>
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loadConfigurations } from './authentication';
export default {
  data() {
    return {
      selectedModel: '',
      teacherPrompt: '',
      studentMessage: '',
      configurations: [],
      responseMessage: ''
    };
  },
  async mounted() {
    await this
    this.localLoadConfigurations();
  },
  methods: {

    async localLoadConfigurations() {
      const token = localStorage.getItem('token');
      if (token) {
        await loadConfigurations(token)
        const configs = localStorage.getItem('thinkModels');
        if (configs) {
          this.configurations = JSON.parse(configs);
        } else {
          console.error('No configurations found. Please log in again.');
        }
      } else {
        console.error('No token found. Please log in again.');
      }
    },
    async submitForm() {
      const formData = {
        message: this.studentMessage,
        context: this.teacherPrompt,
        model: this.selectedModel
      };

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/think/', formData, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        this.responseMessage = response.data;
      } catch (error) {
        console.error('Error submitting form:', error);
        this.responseMessage = 'An error occurred while submitting the form.';
      }
    }
  }
};
</script>

<style scoped>

h1, label{
  font-family: 'Roboto', sans-serif
}
.test-configuration {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.test-configuration form {
  display: flex;
  flex-direction: column;
}

.test-configuration form > div {
  margin-bottom: 1em;
}

.test-configuration label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.test-configuration input,
.test-configuration select {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

.test-configuration button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: rgba(4, 11, 59, 0.73);
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.test-configuration button:hover {
  background-color: rgba(4, 11, 59, 0.73);
}

.response {
  margin-top: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
