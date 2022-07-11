const i18n = { t: value => value }



export const heading = i18n.t('common.record_audio');
export const description = i18n.t('common.upload_max');
export const maxUploadSize = 5242880;
export const maxFileLength = 10;
export const fileRegex = '([a-zA-Z0-9~!\\[\\]@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.m4a|.flac|.mp4|.aac|.wma|.wav|.mp3)$';
export const inputFilter = '.m4a, .flac, .mp4, .aac, .wma, .wav, .mp3';
