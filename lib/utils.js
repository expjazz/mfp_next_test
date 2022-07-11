export function first(...args) {
	return async function handler(req, event) {
		for await (const middleware of args) {
			const res = await middleware(req, event);
			if (res) return res;
		}
	};
}