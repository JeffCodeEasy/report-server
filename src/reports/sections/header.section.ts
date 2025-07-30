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
    const headerDate: Content | undefined = showDate ? {
                text: DateFormatter.getDDMMMYYYY(new Date()),
                alignment: 'right',
                margin: [20, 20],
            } : undefined;


    const headerTitle: Content | undefined = title ? {
        text: title,
        style: {
            bold: true,
        },
    } : undefined;

    return {
        columns: [
              ...(headerLogo ? [headerLogo] : []),
              ...(headerDate ? [headerDate] : []),
              ...(headerTitle ? [headerTitle] : []),
        ],
    }


}