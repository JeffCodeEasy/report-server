import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import {Response} from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}


  @Get('html-report')
  async getHtmlReport(@Res() response: Response){
    const pdfDoc = await  this.extraReportsService.getHtmlReport();
    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'Html-report.pdf'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('comunity-report')
  async getComunityReport(@Res() response: Response){
    const pdfDoc = await  this.extraReportsService.getComunity();
    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'Billing-report.pdf'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  async getCustomSize(@Res() response: Response){
    const pdfDoc = await  this.extraReportsService.getCustomSize();
    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'Billing-report.pdf'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
