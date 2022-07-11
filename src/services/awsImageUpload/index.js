import axios from 'axios';
import { fileToBase64, getFileExtension, isVodacomIOS } from 'customHooks/domUtils';
import Api from 'src/lib/api';
import cmsAPI from 'src/lib/cmsApi';
import { axiosFetch } from '../fetch';


export const awsImageUpload = async (file, extension) => {

	return axiosFetch(Api.getImageCredentials(extension)).then(async (response) => {
		let filename = response.data.data.fields.key.split('/');
		filename = filename[2];
		const formData = new FormData();
		formData.append('success_action_status', response.data.data.fields.success_action_status);
		formData.append('signature', response.data.data.fields.signature);
		formData.append('Content-Disposition', 'attachment');
		formData.append('x-amz-security-token', response.data.data.fields['x-amz-security-token']);
		formData.append('acl', response.data.data.fields.acl);
		formData.append('Access-Control-Allow-Origin', response.data.data.fields['Access-Control-Allow-Origin']);
		formData.append('policy', response.data.data.fields.policy);
		formData.append('key', response.data.data.fields.key);
		formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
		formData.append('file', file);
		const jsonFile = await fileToBase64(file);
		return { formData, url: response.data.data.url, filename, jsonFile, response: {
			...response.data.data,
			extension: getFileExtension(file)
		} };
	}).then(async (response) => {
		let path = null;
		let payload = null;
		if (isVodacomIOS()) {
			path = `${process.env.NEXT_PUBLIC_CMS_SERVICE_ENDPOINT}${cmsAPI.imageUpload}`;
			payload = {
				file: response.jsonFile,
				response: response.response,
			};
		} else {
			path = response.url;
			payload = response.formData;
		}
		const res = await axios.post(path, payload);
		return response.filename;
	}).catch(e => alert(JSON.stringify(e)));
};


export const openAwsUploadCredentials = async (key, extension, fileType, file) => {
	return axiosFetch(Api.getOpenAwsCredentials(key, extension, fileType)).then(async (response) => {
		let filename = response.data.data.fields.key.split('/');
		filename = filename[1];
		const formData = new FormData();
		formData.append('success_action_status', response.data.data.fields.success_action_status);
		formData.append('signature', response.data.data.fields.signature);
		formData.append('Content-Disposition', 'attachment');
		formData.append('x-amz-security-token', response.data.data.fields['x-amz-security-token']);
		formData.append('acl', response.data.data.fields.acl);
		formData.append('Access-Control-Allow-Origin', response.data.data.fields['Access-Control-Allow-Origin']);
		formData.append('policy', response.data.data.fields.policy);
		formData.append('key', response.data.data.fields.key);
		formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
		formData.append('file', file);
		const jsonFile = await fileToBase64(file);
		return { formData, url: response.data.data.url, filename, jsonFile, response: {
			...response.data.data,
			extension: getFileExtension(file)
		} };
	}).then(async (response) => {
		let path = null;
		let payload = null;
		let isVodacomWeb = false;
		if (isVodacomIOS() && isVodacomWeb) {
			path = `${process.env.NEXT_PUBLIC_CMS_SERVICE_ENDPOINT}${cmsAPI.imageUpload}`;
			payload = {
				file: response.jsonFile,
				response: response.response,
			};
		} else {
			path = response.url;
			payload = response.formData;
		}
		const res = await axios.post(path, payload);
		return response.filename;
	});
};