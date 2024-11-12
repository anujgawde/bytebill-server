import { Injectable } from '@nestjs/common';
import axios from 'axios';

import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from '@azure/ai-form-recognizer';
import { DefaultAzureCredential } from '@azure/identity';
import { Readable } from 'stream';

const fs = require('fs');

@Injectable()
export class ExpensesService {
  private client: DocumentAnalysisClient;

  constructor() {
    this.client = new DocumentAnalysisClient(
      process.env.AZURE_ENDPOINT,
      new AzureKeyCredential(process.env.AZURE_API_KEY),
    );
  }

  /* 
        1. Take a receipt file (Image) as an input from the user
        2. Convert to Readable Stream.
        3. Call Azure SDK's prebuilt-receipt model to extract bill data
        4. Return data
        Note: To optimize the process, a check can be added based on the file name. 
        Check the Database initially and if we already have data. Make the API Call only if there's any new data.
    */
  async uploadReceipt(receipt: Express.Multer.File) {
    try {
      const readStream = Readable.from(receipt.buffer);
      const poller = await this.client.beginAnalyzeDocument(
        'prebuilt-receipt',
        readStream,
      );
      const extractedData = await poller.pollUntilDone();

      return extractedData.documents[0];
    } catch (error) {
      console.error('Error extracting data:', error);
      throw error;
    } finally {
      // fs.unlinkSync(filePath); // Remove file after processing
    }
  }
}
