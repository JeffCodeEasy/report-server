import { TDocumentDefinitions } from "pdfmake/interfaces";
import { chartJsToImage } from "src/helpers/chart-utils";
import { text } from "stream/consumers";
import { getDonutChart } from "./charts/donut.chart";
import { table } from "console";
import { headerSection } from "./sections/header.section";
import { getLineChart } from "./charts/line.chart";
import { getBarsChart } from "./charts/bars.chart";
import { footerSection } from "./sections/footer.section";


interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions{
    title?: string;
    subTitle?: string;
    topCountries: TopCountry[];
}

// const generateTopCountryDonut = async (topCountries: TopCountry[]): Promise<string> => {
//     const data = {
//         labels: topCountries.map((country)=> country.country),
//         datasets: [
//             {
//             label: 'Dataset 1',
//             data: topCountries.map((country)=> country.customers),
//             }
//         ]
//     };

//     const config = {
//         type: 'doughnut',
//         data: data,
//         options: {
//             legend: {
//                 position: 'left',
//             },
//             // title: {
//             //     text: 'Chart.js Doughnut Chart',
//             //     display: true,
//             // },
//             plugins: {
//                 datalabels: {
//                     color: 'white',
//                     font: {
//                         weight: 'bold',
//                         size: 14,
//                     }
                    
//                 }
//             }
//         },
//     };

//     return chartJsToImage(config);
// }


export const getStatisticsReports = async (options: ReportOptions): Promise<TDocumentDefinitions>=>{

    const [donutChart, lineChart, barChart1, barChart2] = await Promise.all([
        getDonutChart({
        entries: options.topCountries.map((c) => ({
            label: c.country,
            value: c.customers,
            })),
        position: 'left'
        }),

        getLineChart(),
        getBarsChart(),
        getBarsChart(),

    ]);


    
    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title ?? 'Estadisticas de clientes',
            subTitle: options.subTitle ?? 'Top 10 países con más clientes',
            showDate: true,
            showLogo: true,
        }),
        footer: footerSection,
        content: [
            {
                columns: [
                    
                    {
                        stack: [
                            {
                                text: '10 países con más clientes',
                                alignment: 'center',
                                margin: [0,0,0, 10]
                            },
                            {
                                image: donutChart,
                                width: 300,
                            }
                        ]
                        
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                        headerRows: 1,
                        widths: [100, 'auto'],
                        body: [
                            ['País', 'Clientes'],
                            ...options.topCountries.map((c)=> [c.country, c.customers]),
                        ]
                        }
                    }
                ],
            },
            {
                image: lineChart,
                width: 500,
                margin: [0, 20]
            },
            {   
                columnGap: 10,
                columns: [
                    {
                        image: barChart1,
                        width: 250,
                    },
                    {
                        image: barChart2,
                        width: 250,
                    },
                ]
            },
        ],
    };

    return docDefinition;
}