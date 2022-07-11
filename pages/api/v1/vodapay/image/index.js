import formidable from 'formidable';
import FormData from 'form-data';
// import fs from 'fs';
import AWS from 'aws-sdk';
import multiparty from 'multiparty';
const { Blob } = require('buffer');
const fs = require('fs');
var bucket = 'starsona-stb-usea1';
AWS.config.region = 'us-east-1';
var s3 = new AWS.S3({
	params: {Bucket: bucket}
});


export const config = {
	api: {
		bodyParser: {
			sizeLimit: '200mb' // Set desired value here
		}
	}
};

export const parseFormData = (req) => {
	return new Promise((resolve, reject) => {
		// const form = new formidable.IncomingForm();
		// form.on('fileBegin', (formName, file) => {
		// 	debugger;
		// });
		// form.uploadDir = './';
		// form.keepExtensions = true;
		const form = new multiparty.Form();
		form.parse(req, (err, fields, files) => {
			if (err) {
				reject(err);
			} else {
				resolve({ fields, files });
			}
		});
	}
	);
};
const b64DecodeUnicode = (str) => {
	return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
};
const parseFileUpload = (data, file) => {
	const formData = new FormData();
	formData.append('success_action_status', data.success_action_status);
	formData.append('signature', data.signature);
	formData.append('x-amz-security-token', data['x-amz-security-token']);
	formData.append('acl', data.acl);
	formData.append('Content-Disposition', 'attachment');
	formData.append('Access-Control-Allow-Origin', data['Access-Control-Allow-Origin']);
	formData.append('policy', data.policy);
	formData.append('key', data.key);
	formData.append('AWSAccessKeyId', data.AWSAccessKeyId);
	formData.append('file', file);

	return formData;
};
// const parseFile = async url => {
// 	const file = await fetch(url).then(r => r.blob());
// 	return file;
// };
export default async function handler(req, response) {
	if (req.method === 'POST') {
		const base64Data = req.body.file;
		// const base64 = await fetch(base64Data);
		const buffer = Buffer.from(base64Data.replace('data:application/octet-stream;base64,', ''), 'base64');
		const blob = new Blob([buffer], { type: 'video/mp4' });
		// const reqFormData = await parseFileUpload(req.body.response.fields, blob);

		console.log('S3 IMAGE TEST');
		AWS.config.credentials = new AWS.Credentials({
			accessKeyId: 'AKIAI6TVMDFSMUXZRWXQ',
			secretAccessKey: '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'
		});
		// // const parsedFile = await parseFile(reqFormData.files.file[0].path);
		// // const file = fs.readFileSync(reqFormData.files.file[0].path);
		const reqFormData = req.body.response;

		// const str = b64DecodeUnicode(base64Data);
		var upload = new AWS.S3.ManagedUpload({
			params: {
				Bucket: bucket,
				Key: reqFormData.fields.key,
				key: reqFormData.fields.key,
				// Body: reqFormData.files.file,
				Body: buffer,
				ACL: reqFormData.fields.acl,
				AWSAccessKeyId: reqFormData.fields.AWSAccessKeyId,
				Signature: reqFormData.fields.signature,
				Policy: reqFormData.fields.policy,
				'x-amz-security-token': reqFormData.fields['x-amz-security-token'],
			}
		});
		console.log('before upload');
		const promise = upload.promise();
		const res = await promise;
		console.log(res);
		response.status(200).json({ success: true });
	}
}