import { fileToBase64, getFileExtension } from 'customHooks/domUtils';
import { axiosFetch } from '../services/fetch';


export default async function getAWSCredentials(url, file) {
	return axiosFetch(url)
		.then(async (response) => {
			let filename = response.data.data.fields.key.split('/');
			filename = filename[2];
			const formData = new FormData();
			formData.append('success_action_status', response.data.data.fields.success_action_status);
			formData.append('signature', response.data.data.fields.signature);
			formData.append('x-amz-security-token', response.data.data.fields['x-amz-security-token']);
			formData.append('acl', response.data.data.fields.acl);
			formData.append('Content-Disposition', 'attachment');
			formData.append('Access-Control-Allow-Origin', response.data.data.fields['Access-Control-Allow-Origin']);
			formData.append('policy', response.data.data.fields.policy);
			formData.append('key', response.data.data.fields.key);
			formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
			formData.append('file', file);
			const jsonFile = await fileToBase64(file);
			return { formData, url: response.data.data.url, filename, response: { ...response.data.data, extension: getFileExtension(file) }, jsonFile };
		});
}
