import { TDocumentDefinitions } from "pdfmake/interfaces";


interface ReportOptions {
    name: string
}

export const getHelloWorldReports = (options: ReportOptions): TDocumentDefinitions=>{

    const {name} = options;
    
    const docDefinition: TDocumentDefinitions = {
        content: [`Hola ${name}`],
    };

    return docDefinition;
}