import { axiosFetch } from 'src/services/fetch';

export default async function handler(req, res) {


	try {
		const headers = { ...req.headers };
		delete headers.host;
		const resp = await axiosFetch.get(`${req.query.base}?entity=${req.query.entity}`, {
			headers,
		} );
		console.log('res', resp);
		res.status(200).json({ ...resp.data });
	} catch (e) {
		console.log('======== e =========', e);
		res.status(500).json(e);
	}
}
