
import axios from 'axios';
import { axiosFetch } from 'src/services/fetch';

export default async function handler(req, res) {
	console.log('default proxy post inside');
	const headers = { ...req.headers };
	delete headers.host;
	if (req.method === 'GET') {
		try {
			const resp = await axios.get(req.query.base, {
				headers,
			} );
			console.log('django default ', req.query.base, resp);
			res.status(200).json({ ...resp.data });
		} catch (e) {
			console.log(' e ', e);
			res.status(500).json(e);
		}
	} else if (req.method === 'POST') {
		console.log('default proxy 1');
		try {
			console.log('default proxy 2');
			const resp = await axios.post(req.query.base, req.body,{
				headers,
			} );
			console.log('default proxy 3');
			console.log('default proxy post ', req.body, resp);
			res.status(200).json({ ...resp.data });
		} catch (e) {
			console.log('default proxy 4', e);
			console.log('e ', e);
			res.status(500).json(e);
		}
	}
}
