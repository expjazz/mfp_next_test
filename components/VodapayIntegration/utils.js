export const vodacomUserParser = resp => {
	const emailIndex = resp.data.userInfo.contactInfos.findIndex(row => row.contactType === 'EMAIL');
	const email = emailIndex > -1 ? resp.data.userInfo.contactInfos[emailIndex].contactNo : null;
	const phoneIndex = resp.data.userInfo.contactInfos.findIndex(row => row.contactType === 'MOBILE_PHONE');
	const phone = phoneIndex > -1 ? resp.data.userInfo.contactInfos[phoneIndex].contactNo : null;
	const splitName = resp.data.userInfo.nickName.split(' ');
	const firstName = splitName[0];
	const lastName = splitName.length > 0 ? splitName[1] : '';
	const user = {
		vdId: resp.data.userInfo.userId,
		email,
		userName: email,
		firstName: firstName,
		lastName: lastName,
		source: 7,
		profilePhoto: null,
		phNo: phone.split('-')[1],
		phCode: phone.split('-')[0],
		role: 'R1001',
	};
	return user;
};