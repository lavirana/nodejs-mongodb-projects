import dataUriParser from 'datauri/parser.js';
import path from 'path';

const parser = new dataUriParser();

export const dataUri = (file) => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer);
}