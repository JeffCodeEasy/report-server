import { Injectable, NotFoundException } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCountryReport, getEmploymentLetterByIdReport, getEmploymentLetterReport } from 'src/reports';
import { getHelloWorldReports } from 'src/reports/hello-world.report';


@Injectable()
export class BasicReportsService {
  
  

  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
  ){}

hello(){
    const docDefinition: TDocumentDefinitions = getHelloWorldReports({name: 'Jeremy Fernández'})

    var doc = this.printerService.createPdf(docDefinition);

    return doc
  }


  employmentLetter() {
    const docDefinition: TDocumentDefinitions = getEmploymentLetterReport()

    var doc = this.printerService.createPdf(docDefinition);

    return doc
  }

  async employmentLetterById(employeId: number) {

    const employees = await this.prisma.employees.findUnique({
      where: {
        id: employeId,
      }
    });

    if(!employees) throw new NotFoundException(`EmployeeID: ${employeId} not found`);

    const docDefinition: TDocumentDefinitions = getEmploymentLetterByIdReport({
      employerName: 'Jeremy Fernández',
      employerPosition: 'Gerente de RRHH',
      employeeName: employees.name,
      employeePosition: employees.position,
      employeeStartDate: employees.start_date,
      employeeHours: employees.hours_per_day,
      employeeWorkSchedule: employees.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    })

    var doc = this.printerService.createPdf(docDefinition);

    return doc
  }

  async getCountriesReport(){ 

    const countries = await this.prisma.countries.findMany({
      where: {
        local_name: {
          not: null,
        }
      }
    });

    const docDefinition: TDocumentDefinitions = getCountryReport({countries})

    var doc = this.printerService.createPdf(docDefinition);

    return doc
  }


}
