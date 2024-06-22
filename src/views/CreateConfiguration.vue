<template>
  <div class="create-configuration">
    <h1>Create Configuration</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="prompt-start">Prompt Start</label>
        <textarea id="prompt-start" v-model="config.prompt_start" required></textarea>
      </div>
      <div>
        <label for="prompt-end">Prompt End</label>
        <textarea id="prompt-end" v-model="config.prompt_end" required></textarea>
      </div>
      <div>
        <label for="context-start">Context Start</label>
        <textarea id="context-start" v-model="config.context_start" required></textarea>
      </div>
      <div>
        <label for="context-end">Context End</label>
        <textarea id="context-end" v-model="config.context_end" required></textarea>
      </div>
      <div>
        <label for="provider-model">Provider and Model</label>
        <select id="provider-model" v-model="selectedModel" @change="updateModel" required>
          <option disabled value="">Please select one</option>
          <option v-for="model in models" :key="model.model" :value="model">{{ model.provider }} - {{ model.model }}</option>
        </select>
      </div>
      <div>
        <label for="rag-function">RAG Function</label>
        <select id="rag-function" v-model="selectedRagFunction" @change="updateRagFunction" required>
          <option disabled value="">Please select one</option>
          <option v-for="rag in ragFunctions" :key="rag.rag_function" :value="rag">{{ rag.rag_function }} - {{ rag.rag_function_call }}</option>
        </select>
      </div>
      <div>
        <label for="api-name">API Name</label>
        <input type="text" id="api-name" v-model="config.apiName" required>
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

export default {
  data() {
    return {
      config: {
        prompt_start: '',
        prompt_end: '',
        context_start: '',
        context_end: '',
        provider: '',
        model: '',
        rag_function: '',
        rag_function_call: '',
        apiName: ''
      },
      models: [],
      ragFunctions: [],
      selectedModel: '',
      selectedRagFunction: '',
      responseMessage: ''
    };
  },
  created() {
    this.loadConfigurations();
  },
  methods: {
    loadConfigurations() {
      const configs = localStorage.getItem('ragConfig');
      if (configs) {
        const parsedConfigs = JSON.parse(configs);
        this.models = parsedConfigs.models;
        this.ragFunctions = parsedConfigs.rag_functions;
      } else {
        console.error('No configurations found. Please log in again.');
      }
    },
    updateModel() {
      if (this.selectedModel) {
        this.config.provider = this.selectedModel.provider;
        this.config.model = this.selectedModel.model;
      }
    },
    updateRagFunction() {
      if (this.selectedRagFunction) {
        this.config.rag_function = this.selectedRagFunction.rag_function;
        this.config.rag_function_call = this.selectedRagFunction.rag_function_call;
      }
    },
    async submitForm() {
      const formData = {
        ...this.config,
        update_database: false,
        new_database: true,
        delete_database: false,
        database_name: this.config.apiName
      };

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/document/configuration', formData, {
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
.create-configuration {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.create-configuration form {
  display: flex;
  flex-direction: column;
}

.create-configuration form > div {
  margin-bottom: 1em;
}

.create-configuration label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.create-configuration textarea,
.create-configuration input,
.create-configuration select {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

.create-configuration button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: #41e4fe;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.create-configuration button:hover {
  background-color: #11aec7;
}

.response {
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
