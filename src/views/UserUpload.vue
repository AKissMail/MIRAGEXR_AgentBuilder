<template>
  <div class="upload">
    <h1>Upload Document</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="config-name">Configuration Name</label>
        <input type="text" id="config-name" v-model="selectedConfig" required>
      </div>
      <div class="radio-buttons">
        <input type="radio" id="file-upload" value="file" v-model="uploadType" required>
        <label for="file-upload">Upload File</label>
        <input type="radio" id="text-upload" value="text" v-model="uploadType" required>
        <label for="text-upload">Upload Text</label>
      </div>
      <div v-if="uploadType === 'file'" class="file-upload">
        <label for="document">Select File</label>
        <input type="file" id="document" @change="handleFileUpload" accept=".pdf,.txt,.csv,.html" required>
      </div>
      <div v-else-if="uploadType === 'text'" class="text-upload">
        <label for="text-content">Enter Text</label>
        <textarea id="text-content" v-model="textInput" placeholder="Enter your text here" required></textarea>
      </div>
      <div>
        <label for="document-name">Document Name</label>
        <input type="text" id="document-name" v-model="documentName" required>
      </div>
      <div>
        <label for="database">Database</label>
        <input type="text" id="database" v-model="database" required>
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
      selectedConfig: '',
      uploadType: '',
      textInput: '',
      file: null,
      documentName: '',
      database: '',
      responseMessage: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('config_name', this.selectedConfig);
      formData.append('name', this.documentName);
      formData.append('database', this.database);

      if (this.uploadType === 'file' && this.file) {
        formData.append('document', this.file);
      } else if (this.uploadType === 'text' && this.textInput) {
        const blob = new Blob([this.textInput], { type: 'text/plain' });
        formData.append('document', blob, 'uploaded_text.txt');
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/document/', formData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
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
.upload {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.upload form {
  display: flex;
  flex-direction: column;
}

.upload form > div {
  margin-bottom: 1em;
}

.upload label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.upload input[type="file"],
.upload textarea,
.upload select,
.upload input {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

.upload button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  background-color: #41e4fe;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.upload button:hover {
  background-color: #11aec7;
}

.response {
  margin-top: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-buttons {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 800px) {
  .upload {
    padding: 10px;
  }

  .radio-buttons {
    flex-direction: column;
  }

  .radio-buttons label {
    margin-top: 10px;
  }
}
</style>
