import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

interface HeaderOptions {
    title?: string,
    subTitle?: string,
    showLogo?: boolean,
    showDate?: boolean,
}


const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}



export const headerSection = (options: HeaderOptions): Content=> {

    const {title, subTitle, showLogo, showDate} = options;

    const headerLogo: Content | undefined = showLogo ? logo : undefined;

     const headerSubTitle: Content | null = subTitle ? {
        text: subTitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
            fontSize: 16,
            bold: true,
        }
    } : null

    const headerTitle: Content | undefined = title ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0, 15, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22,
                },
            },
            ...(headerSubTitle ? [headerSubTitle] : []),

        ],
       
    } : undefined;

    

   

    return {
        columns: [
              ...(headerLogo ? [headerLogo] : []),
              ...(headerTitle ? [headerTitle] : []),
              {
                width: 141,
                text: showDate ? DateFormatter.getDDMMMYYYY(new Date()) : '',
                alignment: 'right',
                margin: [20, 30],
              }
        ],
    }


}