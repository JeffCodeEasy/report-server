import { Injectable, NotFoundException } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getBasicChartSvgReport, getStatisticsReports, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly printerService: PrinterService,
    ){}


    async getOrderByIdReport(orderId: number){
        
        const order = await this.prisma.orders.findUnique({
            where: {
                order_id: orderId,

            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    }
                }
            }
        })

        if(!order) throw new NotFoundException(`Order with id ${orderId} not found`);

        // console.log(JSON.stringify(order, null, 2));

        const docDefinition: TDocumentDefinitions = orderByIdReport({
            data: order as any,
        });
        
            var doc = this.printerService.createPdf(docDefinition);
        
            return doc

    }


    async getSvgChart(){
        const docDefinition: TDocumentDefinitions = await getBasicChartSvgReport()

        var doc = this.printerService.createPdf(docDefinition);

        return doc
    }


    async getStatistics(){

        const topCountries = await this.prisma.customers.groupBy({
            by: ['country'],
            _count: true,
            orderBy: {
                _count:{
                    country: 'desc',
                }
            },
            take: 10,
        });

        const topCountryData = topCountries.map(({country, _count}) => ({
            country: country ?? 'Unknown',
            customers: _count,
        }))

        const docDefinition: TDocumentDefinitions = await getStatisticsReports({
            topCountries: topCountryData,
        })
        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }


}
