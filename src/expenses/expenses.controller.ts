import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('upload-receipt')
  @UseInterceptors(FileInterceptor('file')) // Match the key with 'file'
  async uploadReceipt(@UploadedFile() receipt: Express.Multer.File) {
    return this.expensesService.uploadReceipt(receipt);
  }
}
