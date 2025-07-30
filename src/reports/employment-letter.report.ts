import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";

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


export const getEmploymentLetterReport = (): TDocumentDefinitions=>{

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
                text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].

                Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. 
                
                La jornada laboral del Sr./Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.

                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
                style: 'body',
            },
            {
                text: `Atentamente,
                [Nombre del Empleador]
                [Cargo del Empleador]
                [Nombre de la Empresa]
                [Fecha de Emisión`, 
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