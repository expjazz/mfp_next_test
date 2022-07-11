export function detectBots(req) {
	const userAgent = req.headers.get('user-agent');
	const forbidenBot = /petalbot|PetalBot|AhrefsBot|ahrefsbot|SEMrushBot|semrushbot|DotBot|dotbot|MauiBot|mauibot/i.test(userAgent);
	return forbidenBot;
}