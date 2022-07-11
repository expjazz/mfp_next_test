import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { downloadItem, useMedia } from 'customHooks/domUtils';
// import { isIOSDevice } from 'src/utils/checkOS';
// import { Close } from 'styles/CommonStyled';
import { DialogStyled } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { downloadItem, isVodacom, vodacomWebRedirect } from '../../customHooks/domUtils';
import { isIOSDevice } from 'src/utils/checkOS';
import { Close } from 'styles/CommonStyled';
import { useRouter } from 'next/router';

const DownloadHandler = Component => {
	const render = props => {
		const router = useRouter();
		const { t } = useTranslation();
		const isMobile = useMediaQuery('(max-width: 831px)');
		const [chromeModal, setIsChrome] = useState(false);
		const [showNotification, setNotification] = useState(false);
		const externalDownloadPage = router.asPath.includes('external') && router.asPath.includes('downloader');
		const download = (url, nextPage = false, message = true, filename = '') => {
			if (isVodacom()) {
				vodacomWebRedirect(`https://${window.location.host}/external/downloader?download_url=${url}`);
				// vodacomWebRedirect(url);
				return;
			}
			// per https://starsona.freshrelease.com/ws/PM/tasks/PM-3079 Extra
			// param to open the downloaded item in other tab, if needed
			const isChrome =
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor);
			if (
				!externalDownloadPage &&
				isMobile &&
        isIOSDevice() &&
        (isChrome || navigator.userAgent.match('CriOS'))
			) {
				setIsChrome(true);
			} else {
				downloadItem(url, filename, nextPage);
				if (isMobile && message && !externalDownloadPage) {
					setNotification(true);
				}
			}
		};
		const closeHandler = () => {
			setIsChrome(false);
			setNotification(false);
		};
		return (
			<React.Fragment>
				{(chromeModal || showNotification) && !isVodacom() && (
					<DialogStyled
						open={chromeModal || showNotification}
						onClose={closeHandler}
						disableBackdropClick={false}
						classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
					>
						<Close className="close" onClick={closeHandler} />
						{chromeModal && (
							<span className="info">{t('common.mobile_chrome_download')}</span>
						)}
						{showNotification && (
							<span className="info">{t('common.mobile_download')}</span>
						)}
					</DialogStyled>
				)}
				<Component downloadFunc={download} {...props} />
			</React.Fragment>
		);
	};

	return render;
};

DownloadHandler.propTypes = {};

export default DownloadHandler;
