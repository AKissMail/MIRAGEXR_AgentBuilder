# MirageXR Virtual-Instructor-Editor
This is a minimal Web frontend for the AI servers of MirageXR. It enables users to create and test RAG models for the 
Virtual Instructor feature without additional programming knowledge. This early release addresses the document API of 
backend servers. Its main focus is providing an interface to upload configurations, documents, and a set of documents 
to make them available within the MirageXR system.
## How to Set Up
1. Go to Backend and get this server up and running!
2. Install Node and Yarn on your system. 
3. Clone the repository and place it in a folder. 
4. Create a .env file with "VUE_APP_API_BASE_URL=http://localhost:8000" or wherever you run the server. 
5. Run the following two commands in that folder:
```
yarn install 
yarn serve
```