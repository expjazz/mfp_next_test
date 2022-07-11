// import i18n from 'i18next';

const i18n = { t: value => value }


export const heading = i18n.t('common.upload_file');
export const description = i18n.t('common.file_description');
export const maxUploadSize = 5242880;
export const maxFileLength = 10;
export const fileRegex = '([a-zA-Z0-9~!\\[\\]@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.doc|.xlsx|.txt|.docx|.pdf|.xls|.rtf|.ppt|.pptx)$';
export const inputFilter = '.doc, .xlsx, .txt, .docx, .pdf, .xls, .rtf, .ppt, .pptx';
