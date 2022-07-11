import { fileToBase64, getFileExtension, isVodacom, isVodacomIOS } from 'customHooks/domUtils';
import cmsAPI from 'src/lib/cmsApi';
import Api from '../../lib/api';
import { axiosFetch } from '../fetch';

export function postReactionMedia(key, file, extension, fileType, bookingId, apiParams={}) {
	return axiosFetch(Api.getawsCredentials(key, extension, fileType, bookingId), apiParams)
		.then(async (response) => {
			let fileName = response.data.data.fields.key.split('/');
			fileName = fileName[fileName.length - 1];
			const formData = new FormData();
			formData.append('success_action_status', response.data.data.fields.success_action_status);
			formData.append('signature', response.data.data.fields.signature);
			formData.append('x-amz-security-token', response.data.data.fields['x-amz-security-token']);
			formData.append('Content-Disposition', 'attachment');
			formData.append('acl', response.data.data.fields.acl);
			formData.append('Access-Control-Allow-Origin', response.data.data.fields['Access-Control-Allow-Origin']);
			formData.append('policy', response.data.data.fields.policy);
			formData.append('key', response.data.data.fields.key);
			formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
			formData.append('file', file);
			const jsonFile = await fileToBase64(file);

			let url = isVodacomIOS() ? `${process.env.NEXT_PUBLIC_CMS_SERVICE_ENDPOINT}${cmsAPI.imageUpload}` : response.data.data.url;
			let payload = isVodacomIOS() ? {

				file: jsonFile,
				response: { ...response.data.data, extension: getFileExtension(file)},

			} : formData;
			return { formData: payload, url, fileName, jsonFile, };
		});
}

export const onReactionComplete = (bookingId) => {
	return axiosFetch.post(Api.reactionComplete, {
		booking: bookingId,
	})
		.then(resp => resp.data.success);
};
