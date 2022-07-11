// import i18n from 'i18next';

const i18n = { t: value => value }

export const heading = i18n.t('common.upload_file');
export const fileTypes =
  '.aac, .flac, .m4a, .mp3, .mp4, .wav, .wma, .mov, .webm, .mkv, .avi, .mpg, .wmv, .mp4, .svg, .jpg, .gif, .jpeg, .png, .eps, .ai, .raw, .tiff, .tif, .bmp.';
export const maxUploadSize = 5242880;
export const maxFileLength = 10;
export const fileRegex =
  '([a-zA-Z0-9~!\\[\\]@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.aac|.flac|.m4a|.mp3|.mp4|.wav|.wma|.mov|.webm|.mkv|.avi|.mpg|.wmv|.mp4|.svg|.jpg|.gif|.jpeg|.png|.eps|.ai|.raw|.tif|.tiff|.bmp.)$';

