const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const { ENV, NEXT_PUBLIC_PRIVATE_KEY_PATH, NEXT_PUBLIC_VODACOM_CLIENT_ID, NEXT_PUBLIC_VODAPAY_PUBLIC_KEY_PATH } = process.env;
let privateKeyData, publicKeyData;

// if (ENV === 'dev') {

// 	// const privateKeyFile = path.join(process.cwd(), NEXT_PUBLIC_PRIVATE_KEY_PATH);
// 	privateKeyData = fs.readFileSync(path.join(process.cwd(), '/certificates/rsa_private_key.pem'), 'utf8');

// 	// const publicKeyFile = path.join(process.cwd(), NEXT_PUBLIC_VODAPAY_PUBLIC_KEY_PATH);
// 	publicKeyData = fs.readFileSync(path.join(process.cwd(),'/certificates/rsa_public_key.pem'), 'utf8');
// } else {
// const privateKeyFile = path.join(process.cwd(), NEXT_PUBLIC_PRIVATE_KEY_PATH);
// privateKeyData = fs.readFileSync(path.join(__dirname, 'certificates', 'rsa_private_key.pem'), 'utf8');

// const publicKeyFile = path.join(process.cwd(), NEXT_PUBLIC_VODAPAY_PUBLIC_KEY_PATH);
// publicKeyData = fs.readFileSync(path.join(__dirname, 'certificates', 'rsa_public_key.pem'), 'utf8');
// }
const generatePayload = (method, endPoint, time, body) => {
	const unsignedPayload = `${method} ${endPoint}\n${NEXT_PUBLIC_VODACOM_CLIENT_ID}.${time}.${JSON.stringify(body)}`;
	return unsignedPayload;
};

const generate = (method, endPoint, requestTime, body) => {
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