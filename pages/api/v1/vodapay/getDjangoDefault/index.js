import { axiosFetch } from 'src/services/fetch';

export default async function handler(req, res) {
	const headers = { ...req.headers };
	if (req.query?.domain) {
		headers.origin = req.query.domain;
	}
	delete headers.host;
	console.log('django default query', req.query.base, headers);
	if (req.method === 'GET') {
		try {
			const resp = await axiosFetch.get(req.query.base, {
				headers,
			} );
			console.log('django default', req.query.base, resp);
			if (resp.headers) {
				Object.keys(resp.headers).forEach(key => {
					res.setHeader(key, resp.headers[key]);
				});
			}
			res.status(200).json({ ...resp.data });
		} catch (e) {
			console.log('django default e', e);
			res.status(500).json(e);
		}
	} else if (req.method === 'POST') {
		try {
			const resp = await axiosFetch.post(req.body.base, req.body.data,{
				headers,
			} );
			console.log('django default post', req.body, resp);
			res.status(200).json({ ...resp.data });
		} catch (e) {
			console.log('e', e);
			res.status(500).json(e);
		}
	}
}
