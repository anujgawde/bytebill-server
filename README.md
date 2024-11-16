
# Bytebill Server

Bytebill Server is a backend service built using [NestJS](https://nestjs.com/) to support the **Bytebill** expense management system. This server provides an API to process expense receipt files and extract structured information using Azure Document Intelligence.

## Features

- **File Upload API**: Accepts receipt files for processing.
- **Integration with Azure Document Intelligence**: Uses Azure's prebuilt receipt model to extract data from uploaded receipts.
- **Stream-based Processing**: Handles file buffers as readable streams for efficient processing.
- **Scalable Backend Service**: Built on NestJS for robust and maintainable backend architecture.

## API Overview

### Endpoint: `/expenses/upload-receipt`

- **Method**: `POST`
- **Description**: Accepts a receipt file as input and extracts structured data using Azure Document Intelligence.
- **Input**: 
  - A file (currently an image) uploaded as form data.
- **Response**:
  - JSON object containing the extracted receipt information.

## How It Works

1. **File Upload**:
   - The API receives the file via a POST request.
2. **File Processing**:
   - The file buffer is converted into a readable stream.
3. **Azure Document Intelligence**:
   - The stream is sent to Azure's prebuilt receipt model using the `@azure/ai-form-recognizer` SDK.
   - The method `beginAnalyzeDocument` is used to analyze the document.
4. **Response**:
   - The extracted data is returned to the client in a structured format.


## Prerequisites

- Node.js
- NestJS
- Azure account with the Document Intelligence service configured.
- API key and endpoint for Azure Document Intelligence.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bytebill-server.git
   cd bytebill-server
2. Install dependencies:
   ```bash
	npm install
3. Configure environment variables: Create a `.env` file in the root of the project and add the following:
   ```bash
	AZURE_FORM_RECOGNIZER_ENDPOINT=<your-endpoint>
	AZURE_FORM_RECOGNIZER_API_KEY=<your-api-key>
	PORT=8001

## Technologies Used
-   **Node.js**: Backend runtime.
-   **NestJS**: Framework for building server-side applications.
-   **Azure Document Intelligence SDK**: [`@azure/ai-form-recognizer`](https://www.npmjs.com/package/@azure/ai-form-recognizer) for document processing.

## Stay in touch

- Author - [Anuj Gawde](https://x.com/axgdevv)
