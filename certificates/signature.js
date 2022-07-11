const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const NEXT_PUBLIC_VODACOM_CLIENT_ID = process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID;
let privateKeyData, publicKeyData;

// if (ENV === 'dev') {

// 	// const privateKeyFile = path.join(process.cwd(), NEXT_PUBLIC_PRIVATE_KEY_PATH);
// 	privateKeyData = fs.readFileSync(path.join(process.cwd(), '/certificates/rsa_private_key.pem'), 'utf8');

// 	// const publicKeyFile = path.join(process.cwd(), NEXT_PUBLIC_VODAPAY_PUBLIC_KEY_PATH);
// 	publicKeyData = fs.readFileSync(path.join(process.cwd(),'/certificates/rsa_public_key.pem'), 'utf8');
// } else {
// const privateKeyFile = path.join(process.cwd(), NEXT_PUBLIC_PRIVATE_KEY_PATH);
// privateKeyData = fs.readFileSync(path.join(__dirname, 'certificates', 'rsa_private_key.pem'), 'utf8');

// // const publicKeyFile = path.join(process.cwd(), NEXT_PUBLIC_VODAPAY_PUBLIC_KEY_PATH);
// publicKeyData = fs.readFileSync(path.join(__dirname, 'certificates', 'rsa_public_key.pem'), 'utf8');
// debugger;
// }
// privateKeyData = fs.readFileSync(path.join(__dirname, 'certificates', 'rsa_private_key.pem'), 'utf8');

const generatePayload = (method, endPoint, time, body) => {
	const unsignedPayload = `${method} ${endPoint}\n${NEXT_PUBLIC_VODACOM_CLIENT_ID}.${time}.${JSON.stringify(body)}`;
	return unsignedPayload;
};

privateKeyData = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDhE5k6mNHEK5RS
dRfkk9B8uZRax9+YFlZ8qF7hVdlHt0AmYbUpcEFFZ8FQ42RzQ23fP4hx6SlPIXkm
nIyruAe5bsNqhXxuTK9csT0u1eXfmQcMvhGhzkwEXNA8G7bRi/9wlILQd8LPO49v
6lrsODkbKowstzsggyrI5lhkI1qzoZnRH0DSFiMElg6ORniGTmZG8LINTKshCCUL
X3B7/9lInHLj0TNZlE/X1M5Zk0M7yoyKfZgM/aaI5YEUCmJlGtMWWZQ505OdD1mV
HY2ME1YcJc/HRdgsovQn8mJ7JCW5/VmCsGW4YN+V2JGaQL5igbLhhZiNR3/AmaDY
tBSnWNv1AgMBAAECggEAOfjCTsVtwgk3esWOEeHAoV9rRraUcKfQPutfBMsH2+Dn
NPuVnca8CRRgRmVLSiTj98x1aGGVsjv86GUKFnCgDLLqwlT/Z6l4wXclOxr8ykqv
9ig+gl6QVc9SEylQPUjB0k1uJCO0mYvNthW2tYEFtGmRETNgl08xhe1OdvxkMD/D
mQ3Pd1R1qe2XE8f78+mxYduPnSaDvpNdLMEz8Mo/SDRSPe6h+yaGC3FcLV4Pmsin
fnwsGj1Ax7/qn97/vojiSR9bt011raG6kLCeUUVL4ntm9VZBW0x+QXN7fgY6CUfE
bwUBGYRFtwlyVHWtX1XW+R5Ocho5mxW+Cofn54nGAQKBgQD3UA0wRJqs9vjvyU0v
W144VjoLrZ2NH+oMdxb/b+MUcT4QppQBCXbBoMG6Ff277LLwQCQYqNHzI6xHRntP
KiDqtqHIPD6emF6qxKyTkQJxd+JaR5P0Rd+fgF6AhHBwBLm786JokgF9hRxlYBdJ
GYcliQg93dw3ERs7dMIfALykmQKBgQDo+5bo7A7MOEWBwGCpFAsIo5iJ2eOEU8E5
VfIL1JJ0fFGbeK0PtSxW3DWpwhgfUaLcAAq3lvx1cVh9/fGZNnpCXjyyp0zvROGT
HW+JHjIuDEBnaeX1l3Kf6JUkbZOOpfMWyGumyZjnWoO8Jx0OFMJnQ8i0dgVvL94b
Ilafwn1vvQKBgHNfD9f9mR6pVDYgdXZrLEghyZBbHM2SHtBT2hGts4R805RW8WKO
dK0dfmJ+EdFSOaOkeHJchxzi/mJ9udaTc6mrK0vK9vdrY3ZMq6lnk3k1kQ3GqHnj
AtBYxT01C3LmcXMB1DjuK+3PZBDSw+ohE4/qHkMmNa4mt8qDzG9EG7y5AoGAQ/8B
eTND0lht+MNjspT172yHnVvpKfqjvw8VWFyO7c5GpwBeSeJPcX5NbyEFl0ZlKJ4e
gpxfTAtrj0HpHBUpM2t7fYyUSJSq3RvPLI6SiJvsxAHFKpsryf3AYWRVl2FZhAG0
YXYe2Q6yudwUf8KRRkAjOH/lcCDhSrwH2hKSN2UCgYEAtbxHLL9dErlrz94mqpPg
DcWZgq5bztCo8rxIDlxb7db0nT4ADdB2sk3wlDveZrgPNKF/dwBG8qITVW4K8N/w
AvKQxSBhLJA7JxvWb2qj1IVk3XK9ifeUeXulC8OWQ9yssVY3ZW3He1AeUdsvA2Kp
X23JaNa6mFdruSeMatKMhvA=
-----END PRIVATE KEY-----`;

const generate = (method, endPoint, requestTime, body) => {
	// const privateKeyData = fs.readFileSync(privateKeyDataPath, 'utf8');
	const privateKeyObj = crypto.createPrivateKey(privateKeyData, 'utf8');
	const unsignedPayload = generatePayload(method, endPoint, requestTime, body);
	const signer = crypto.createSign('RSA-SHA256');
	signer.write(unsignedPayload);
	signer.end();

	const signature = signer.sign(privateKeyObj, 'base64');
	return signature;
};

const verify = (headers, body, method, endpoint) => {
	const requestTime = headers['request-time'];
	const signature = headers.signature.split(',').pop().substr(10);
	const unsignedPayload = generatePayload(method, endpoint, requestTime, body);

	const publicKeyObj = crypto.createPublicKey(publicKeyData, 'utf8');
	const verifyer = crypto.createVerify('RSA-SHA256');

	verifyer.write(unsignedPayload);
	verifyer.end();

	return !!verifyer.verify(publicKeyObj, signature, 'base64');
};

module.exports = {
	generate,
	verify
};