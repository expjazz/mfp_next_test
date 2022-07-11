import path from 'path';
import vodacomApi from 'src/lib/vodacomApi';
import { getRequestTime, vodacomFetch } from 'src/services/fetch';
import fs from 'fs';

const vodacomHeaderConstructor = require('src/utils/vodacomHeaders');
export default async function handler(req, res) {
	// const dirRelativeToPublicFolder = 'certificates';
	console.log(path);
	// const dir = path.resolve('./public', dirRelativeToPublicFolder);

	// const privateKeyData = fs.readFileSync(path.join(dir, 'rsa_private_key.pem'), 'utf8');
	const headers = vodacomHeaderConstructor('POST', vodacomApi.applyToken, req.body, true);
	try {

		const vodaResponse = 	await vodacomFetch.post(vodacomApi.applyToken,
		  req.body
			, {
				headers,
			}
		);
		res.status(200).json({ data: vodaResponse.data });
	} catch (e) {
		res.status(500).json(e);
	}
}
