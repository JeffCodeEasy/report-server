import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { DateFormatter } from "src/helpers";

interface ReportValues {
    employerName: string;
    employerPosition: string;
    employeeName: string;
    employeePosition: string;
    employeeStartDate: Date;
    employeeHours: number;
    employeeWorkSchedule: string;
    employerCompany: string;
}

const style: StyleDictionary = {
    header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 50, 0, 50],
    },
    body: {
        alignment: 'justify',
        margin: [0, 0 , 0, 70],
    },
    signature: {
        fontSize: 14,
        bold: true,
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
    }
}


export const getEmploymentLetterByIdReport = (values: ReportValues): TDocumentDefinitions=>{

    const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;

    const docDefinition: TDocumentDefinitions = {
        styles: style,
        pageMargins: [40, 60, 40, 60],

        header: headerSection({
            showLogo: true,
            showDate: true,
            // title: 'CONSTANCIA DE EMPLEO'
        }),

        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header',
            },
            {
                text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMYYYY(employeeStartDate)}.

                Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. 
                
                La jornada laboral del Sr./Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeHours}, cumpliendo con las políticas y procedimientos establecidos por la empresa.

                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
                style: 'body',
            },
            {
                text: `Atentamente,
                ${employerName}
                ${employerPosition}
                ${employerCompany}
                ${employeeWorkSchedule}`, 
                style: 'signature'
            },
            
        ],

        footer: {
            text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
            style: 'footer',
        }

    };

    return docDefinition;
}