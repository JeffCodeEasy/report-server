import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as country } from "@prisma/client";
import { footerSection } from "./sections/footer.section";
import { text } from "stream/consumers";

interface ReportOptions {
    title?: string,
    subTitle?: string,
    countries: country[],
}

export const getCountryReport = (options: ReportOptions): TDocumentDefinitions =>{

    const {title, subTitle, countries} = options;
    
   const sanitize = (value: string | null | undefined) => value ?? '';

const tableBody = countries.map((country) => [
  sanitize(country.id.toString()),
  sanitize(country.iso2),
  sanitize(country.iso3),
  sanitize(country.name),
  sanitize(country.continent),
  sanitize(country.local_name),
]);

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            showLogo: true,
            showDate: true,
            title: title ?? 'Countries Report',
            subTitle: subTitle ?? 'List of countries',
        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],
        content: [
            {
                layout: 'customLayout01', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],

                    body: [
                    [ 'ID', 'ISO2','ISO3', 'Name', 'Continent', 'Local Name' ],
                    ...tableBody,

                    ]
                }
            },

            // Tabla de totales
            {
                text: 'Totales',
                style: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 40, 0, 0]
                },
            },
            {
                layout: 'noBorders',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 70, '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Total de países:',
                                colSpan: 2,
                                bold: true,
                            },
                            {},
                            {
                                text: `${countries.length.toString()} países`,
                                bold: true,
                            },
                            {},
                            
                        ]

                    ]
                }
            }
        ]
    }

} 