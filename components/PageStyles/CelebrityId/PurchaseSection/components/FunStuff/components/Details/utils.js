import axios from 'axios';
import { postReactionMedia } from 'src/services/postReaction';
import { awsKeys } from 'src/constants/';

export const fileUpload = (file) => {
  const re = /(?:\.([^.]+))?$/;
  return postReactionMedia(
    awsKeys.digitalResponse,
    file.file,
    re.exec(file.file_name) ? re.exec(file.file_name)[1] : '',
    file.file_type,
  ).then(resp => {
    return axios.post(resp.url, resp.formData)
      .then(() => {
        return resp.fileName
      })
  }) 
}
