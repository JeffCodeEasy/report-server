import htmlToPdfmake from 'html-to-pdfmake';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;


interface ContentReplacer {
    [key: string]: string;
}

export const getHtmlContent = (html: string, replacers: ContentReplacer = {}) => {

    Object.entries(replacers).forEach(([key, value]) => {
        const key1 = `{{ ${key} }}`;
        const key2 = `{{${key}}}`; 


        html = html.replaceAll(key1, value).replaceAll(key2, value);
    });


    // initiate the "window" object in Node
    const { window } = new JSDOM('');

    return htmlToPdfmake(html, { window });
}