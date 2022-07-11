import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { useTranslation } from 'next-i18next';
import {
	FacebookShareButton,
	TwitterShareButton,
	EmailShareButton,
} from 'react-share';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMobile, faDownload, faLink } from '@fortawesome/pro-light-svg-icons';
import Popover from '@material-ui/core/Popover';
// import { socialConstants } from 'constants';
// import DownloadHandler from 'components/DownloadHandler';
// import { getMobileOperatingSystem } from '../../utils/checkOS';
import ToolTip from '../ToolTip';
import SecondaryButton from '../SecondaryButton';
import ShareStyled from './styled';
import DownloadHandler from '../DownloadHandler';
import { getMobileOperatingSystem } from '../../src/utils/checkOS';
import { socialConstants } from 'src/constants';
import { isVodacom, vodacomWebRedirect } from 'customHooks/domUtils';
import { faMailbox } from '@fortawesome/pro-regular-svg-icons';

const Share = React.forwardRef((props, ref) => {
	const { t, ready } = useTranslation();
	const shareAnchor = useRef(null);
	const [isMobile] = useState(getMobileOperatingSystem());
	const [showShare, toggleShare] = useState(false);
	const [highlightCopy, toggHighCopy] = useState(false);
	const [highlightSms, toggHighSms] = useState(false);

	const toggleList = state => () => {
		toggleShare(state);
	};

	const sendEmail = shareUrl => () => {
		vodacomWebRedirect(`mailto:?subject=${props.title}&body=${body ? `${body}\n\n${shareUrl}` : shareUrl}`);
	};

	const sendSms = shareUrl => () => {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		if (isVodacom()) {
			if (/android/i.test(userAgent)) {
				vodacomWebRedirect(
					`sms:?body=${encodeURIComponent(`${props.title} ${shareUrl}`)}`,
				);
			} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				vodacomWebRedirect(
					`sms:&body=${encodeURIComponent(
						`${props.smsTitle || props.title}: ${shareUrl}`,
					)}`,
				);
			}
		} else {

			if (/android/i.test(userAgent)) {
				window.open(
					`sms:?body=${encodeURIComponent(`${props.title} ${shareUrl}`)}`,
				);
			} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				window.open(
					`sms:&body=${encodeURIComponent(
						`${props.smsTitle || props.title}: ${shareUrl}`,
					)}`,
				);
			}
		}
	};

	const downloadFile = () => {
		props.downloadFunc(props.downloadUrl, props.downloadName);
	};

	const onCopy = shareUrl => () => {
		copy(shareUrl);
		toggHighCopy(true);
		setTimeout(() => {
			toggHighCopy(false);
		}, 1000);
	};

	const ListWrapper = props.noPopOver ? React.Fragment : Popover;
	const listOptions = props.noPopOver
		? {}
		: {
			id: 'share-popper',
			open: showShare,
			anchorEl: shareAnchor && shareAnchor.current,
			onClose: toggleList(false),
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'right',
			},
			transformOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
		};

	const shareUrl = props.fullShareUrl
		? props.shareUrl
		: `https://${props.shareUrl}`;

	const { title, body } = props;
	return (
		ready && (
			<ShareStyled className={props.classes.root} ref={ref}>
				{!props.alwaysActive && (
					<ToolTip title={props.buttonTooltip}>
						<span>
							<SecondaryButton
								secondary={props.secondary}
								ref={shareAnchor}
								isDisabled={props.disabled}
								className={`action-btn ${props.classes.button}`}
								onClick={toggleList(!showShare)}
							>
								{props.buttonText}
							</SecondaryButton>
						</span>
					</ToolTip>
				)}
				{(!props.noPopOver || showShare || props.alwaysActive) && (
					<ListWrapper {...listOptions}>
						<ShareStyled.List className="share-list">
							<li className="list-item">
								<FacebookShareButton
									className="social-btn"
									quote={title}
									url={shareUrl}
									beforeOnClick={() =>
										props.beforeShare(socialConstants.twitter)
									}
								>
									<FontAwesomeIcon className="icon" icon={faFacebookF} />
									<span className="icon-text">{t('common.facebook')}</span>
								</FacebookShareButton>
							</li>
							<li className="list-item">
								<TwitterShareButton
									className="social-btn"
									url={shareUrl}
									title={title}
									beforeOnClick={() =>
										props.beforeShare(socialConstants.twitter)
									}
								>
									<FontAwesomeIcon className="icon" icon={faTwitter} />
									<span className="icon-text">{t('common.twitter')}</span>
								</TwitterShareButton>
							</li>
							<li className="list-item">
								<span
									className={`social-btn ${highlightCopy ? 'highlight' : ''}`}
									role="presentation"
									onClick={onCopy(shareUrl)}
								>
									<FontAwesomeIcon className="icon" icon={faLink} />
									<span className="icon-text">
										{highlightCopy ? t('common.copied') : t('common.copy')}
									</span>
								</span>
							</li>
							<li className="list-item">
								{
									isVodacom() ? (
										<span
											className={'social-btn'}
											role="presentation"
											onClick={sendEmail(shareUrl)}
										>
											<FontAwesomeIcon className="icon" icon={faMailbox} />
											<span className="icon-text">{t('common.emailLbl')}</span>
										</span>
									) : (

										<EmailShareButton
											className="social-btn"
											url={shareUrl}
											body={body ? `${body}\n\n${shareUrl}` : shareUrl}
											beforeOnClick={() => props.beforeShare('email')}
										>
											<FontAwesomeIcon className="icon" icon={faEnvelope} />
											<span className="icon-text">{t('common.emailLbl')}</span>
										</EmailShareButton>
									)
								}
							</li>
							{props.downloadUrl ? (
								<li className="list-item">
									<span
										className="social-btn"
										role="presentation"
										onClick={downloadFile}
									>
										<FontAwesomeIcon className="icon" icon={faDownload} />
										<span className="icon-text">{t('common.download')}</span>
									</span>
								</li>
							) : null}
							{isMobile && (
								<li className="list-item">
									<span
										className={`social-btn ${highlightSms ? 'highlight' : ''}`}
										role="presentation"
										onClick={sendSms(shareUrl)}
									>
										<FontAwesomeIcon className="icon" icon={faMobile} />
										<span className="icon-text">{t('common.sms')}</span>
									</span>
								</li>
							)}
							{props.download && (
								<li className="list-item">
									<span
										className="social-btn"
										role="presentation"
										onClick={() => props.downloadVideo({ value: 'download' })}
									>
										<FontAwesomeIcon
											icon={faDownload}
											className="download-icon"
										></FontAwesomeIcon>
										<span className="icon-text">{t('common.download')}</span>
									</span>
								</li>
							)}
						</ShareStyled.List>
					</ListWrapper>
				)}
			</ShareStyled>
		)
	);
});

Share.defaultProps = {
	beforeShare: () => {},
	secondary: false,
	classes: {},
	buttonText: i18n.t('common.shareThis'),
	title: '',
	buttonTooltip: '',
	disabled: false,
	body: undefined,
	downloadUrl: undefined,
	noPopOver: false,
	downloadName: '',
	smsTitle: '',
	alwaysActive: false,
	download: false,
	downloadVideo: () => {},
};

Share.propTypes = {
	shareUrl: PropTypes.string.isRequired,
	secondary: PropTypes.bool,
	noPopOver: PropTypes.bool,
	classes: PropTypes.object,
	buttonTooltip: PropTypes.string,
	buttonText: PropTypes.string,
	title: PropTypes.string,
	body: PropTypes.string,
	disabled: PropTypes.bool,
	downloadUrl: PropTypes.string,
	downloadName: PropTypes.string,
	beforeShare: PropTypes.func,
	smsTitle: PropTypes.string,
	alwaysActive: PropTypes.bool,
	download: PropTypes.bool,
	downloadVideo: PropTypes.func,
};

export default DownloadHandler(Share);
