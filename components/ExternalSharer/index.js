/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	FacebookShareButton,
	TwitterShareButton,
	EmailShareButton,
} from 'react-share';
import { useTranslation } from 'next-i18next';
// import i18n from 'i18next';
// import { useTranslation } from 'next-i18next';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faInstagram,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Input from 'components/TextInput';
// import { socialConstants } from 'constants';
import { faMobile, faDownload, faLink } from '@fortawesome/pro-light-svg-icons';
import DownloadHandler from 'components/DownloadHandler';
// import { getMobileOperatingSystem } from '../../utils/checkOS';
import ToolTip from '../ToolTip';
import SecondaryButton from '../SecondaryButton';
import { getTwitterText } from './utils';
import ShareStyled, { Poppover } from './styled';
import { socialConstants } from 'src/constants';
import { isBrowser, isVodacom } from 'customHooks/domUtils';
import { getMobileOperatingSystem } from 'src/utils/checkOS';
import { useRouter } from 'next/router';

const ExternalShareButton = React.forwardRef((props, ref) => {
	const { t, ready } = useTranslation();
	const router = useRouter();
	const shareUrl = router.query.share_url || '';
	const shareAnchor = useRef(null);
	const popperRef = useRef(null);
	const isMobile = isBrowser() ? getMobileOperatingSystem() : false;
	const [showShare, toggleShare] = useState(true);
	const [highlightCopy, toggHighCopy] = useState(false);
	const [smsInput, toggSmsInput] = useState(false);
	const [smsNo, updateSmsNo] = useState('');
	const [smsErr, setSmsErr] = useState('');

	const toggleList = state => () => {
		toggleShare(state);
	};

	const sendSms = shareUrl => () => {
		if (smsNo.trim() !== '') {
			const userAgent = navigator.userAgent || navigator.vendor || window.opera;
			props.beforeShare();
			if (/android/i.test(userAgent)) {
				window.open(
					`sms:${smsNo}?body=${encodeURIComponent(
						`${props.content.smsTitle || props.content.title} ${shareUrl}`,
					)}`,
				);
			} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				window.open(
					`sms:${smsNo}&body=${encodeURIComponent(
						`${props.content.smsTitle || props.content.title}: ${shareUrl}`,
					)}`,
				);
			}
			toggSmsInput(false);
		} else {
			setSmsErr(t('common.invalidNumber'));
		}
	};

	const onTextChange = event => {
		updateSmsNo(event.target.value.trim());
	};

	const renderMore = () => {
		if (navigator.share) {
			return (
				<li className="list-item">
					<span
						className="social-btn"
						role="presentation"
						onClick={() => {
							navigator.share({
								title: props.content.title,
								url:  shareUrl,
							});
						}}
					>
						<span className="icon-text">{t('common.more')}</span>
					</span>
				</li>
			);
		}
	};

	const downloadFile = () => {
		props.downloadFunc(props.downloadUrl, props.downloadName);
	};

	const onCopy = shareUrl => {
		copy(shareUrl);
		toggHighCopy(true);
		setTimeout(() => {
			toggHighCopy(false);
		}, 1000);
	};

	const onWindowClick = event => {
		if (
			popperRef.current &&
      !popperRef.current.contains(event.target) &&
      shareAnchor.current &&
      !shareAnchor.current.contains(event.target)
		) {
			toggleShare(false);
		}
	};

	useEffect(() => {
		if (!smsInput) {
			updateSmsNo('');
			setSmsErr('');
		}
	}, [smsInput]);

	useEffect(() => {
		window.addEventListener('click', onWindowClick);
		return () => window.removeEventListener('click', onWindowClick);
	}, [popperRef.current, shareAnchor.current]);

	const ListWrapper = props.noPopOver ? React.Fragment : Poppover;
	const listOptions = props.noPopOver
		? {}
		: {
			id: 'share-popper',
			open: showShare,
			anchorEl: shareAnchor && shareAnchor.current,
			onClose: toggleList(false),
			classes: {
				paper: 'paper-root',
			},
			disablePortal: true,
			placement: 'bottom-start',
			modifiers: {
				flip: {
					enabled: false,
				},
				preventOverflow: {
					enabled: false,
					boundariesElement: 'scrollParent',
				},
			},
			...props.popperProps,
		};

	const { content } = props;
	return (

		<ShareStyled className={props.classes.root} ref={ref}>
			{!props.alwaysActive && (
				<ToolTip title={props.buttonTooltip}>
					<span>
						{props.renderButton ? (
							props.renderButton({
								anchorProps: {
									ref: shareAnchor,
								},
								buttonProps: {
									onClick: toggleList(!showShare),
									className: 'action-btn',
								},
							})
						) : (
							<SecondaryButton
								secondary={props.secondary}
								ref={shareAnchor}
								isDisabled={props.disabled}
								className={`action-btn ${props.classes.button}`}
								onClick={toggleList(!showShare)}
							>
								{props.buttonText}
							</SecondaryButton>
						)}
					</span>
				</ToolTip>
			)}
			<ListWrapper {...listOptions}>
				<ShareStyled.List ref={popperRef} className="share-list">
					{props.services && props.services.facebook ? (
						<li className="list-item">
							{!props.facebookLikeInstagram ? (
								<FacebookShareButton
									className="social-btn"
									quote={content.title}
									url={ shareUrl}
									beforeOnClick={() => {
										try {
											props.beforeShare(socialConstants.facebook);
										} catch (e) {
											console.log('share error: ', e);
										}
									}
									}
								>
									<FontAwesomeIcon className="icon" icon={faFacebookF} />
									<span className="icon-text">{t('common.facebook')}</span>
								</FacebookShareButton>
							) : (
								<FacebookShareButton
									className="social-btn"
									quote={content.title}
									url={`${ shareUrl}&fb=true`}
									beforeOnClick={() => {
										try {
											props.beforeShare(socialConstants.facebook);
										} catch (e) {
											console.log('share error: ', e);
										}
									}
									}
								>
									<FontAwesomeIcon className="icon" icon={faFacebookF} />
									<span className="icon-text">{t('common.facebook')}</span>
								</FacebookShareButton>
							)}
						</li>
					) : null}
					{props.services && props.services.twitter ? (
						<li className="list-item">
							<TwitterShareButton
								className="social-btn"
								title={getTwitterText(content.title,  shareUrl)}
								url={ shareUrl}
								beforeOnClick={() => {
									try {
										props.beforeShare(socialConstants.twitter);
									} catch (e) {
										console.log('share error: ', e);
									}
								}
								}
							>
								<FontAwesomeIcon className="icon" icon={faTwitter} />
								<span className="icon-text">{t('common.twitter')}</span>
							</TwitterShareButton>
						</li>
					) : null}
					{props.onInstaClick ? (
						<li className="list-item">
							<span
								className="social-btn"
								role="presentation"
								onClick={event => {
									try {
										props.beforeShare(socialConstants.instagram);
										props.onInstaClick(event);
									} catch (e) {
										console.log('share error: ', e);
									}
								}}
							>
								<FontAwesomeIcon className="icon" icon={faInstagram} />
								<span className="icon-text">{t('common.instagram')}</span>
							</span>
						</li>
					) : null}
					{props.onStoryClick ? (
						<li className="list-item">
							<span
								className="social-btn"
								role="presentation"
								onClick={event => {
									try {
										props.beforeShare(socialConstants.instagram);
										props.onStoryClick(event);
									} catch (e) {
										console.log('share error: ', e);
									}
								}}
							>
								<FontAwesomeIcon className="icon" icon={faInstagram} />
								<span className="icon-text">{t('common.story')}</span>
							</span>
						</li>
					) : null}
					<li className="list-item">
						<span
							className="social-btn"
							role="presentation"
							onClick={() => {
								props.beforeShare(socialConstants.copy);
								onCopy( shareUrl);
							}}
						>
							<FontAwesomeIcon className="icon" icon={faLink} />
							<span className="icon-text">
								{highlightCopy ? t('common.copied') : t('common.copy')}
							</span>
						</span>
					</li>
					{
						!isVodacom() && (

							<li className="list-item">
								<EmailShareButton
									className="social-btn"
									url={ shareUrl}
									subject={content.emailSubject}
									body={content.emailBody}
									beforeOnClick={() => {
										try {
											props.beforeShare(socialConstants.email);
										} catch (e) {
											console.log('share error: ', e);
										}

									}
									}
								>
									<FontAwesomeIcon className="icon" icon={faEnvelope} />
									<span className="icon-text">{t('common.emailLbl')}</span>
								</EmailShareButton>
							</li>
						)
					}
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
					{isMobile && renderMore()}
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
		</ShareStyled>

	);
});

ExternalShareButton.defaultProps = {
	beforeShare: () => {},
	secondary: false,
	classes: {},
	buttonText: 'common.shareThis',
	popperProps: {},
	content: {
		title: '',
		emailSubject: '',
		emailBody: '',
		smsTitle: '',
	},
	services: {
		facebook: true,
		twitter: true,
		email: true,
		sms: true,
		instagram: false,
		instagramStory: false,
		download: false,
	},
	buttonTooltip: '',
	renderButton: null,
	disabled: false,
	downloadUrl: undefined,
	noPopOver: false,
	downloadName: '',
	alwaysActive: false,
	downloadVideo: () => {},
	facebookLikeInstagram: false,
};

ExternalShareButton.propTypes = {
	shareUrl: PropTypes.string.isRequired,
	facebookLikeInstagram: PropTypes.bool,
	secondary: PropTypes.bool,
	noPopOver: PropTypes.bool,
	content: PropTypes.object,
	renderButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	popperProps: PropTypes.object,
	classes: PropTypes.object,
	buttonTooltip: PropTypes.string,
	buttonText: PropTypes.string,
	disabled: PropTypes.bool,
	downloadUrl: PropTypes.string,
	downloadName: PropTypes.string,
	beforeShare: PropTypes.func,
	alwaysActive: PropTypes.bool,
	services: PropTypes.object,
	downloadVideo: PropTypes.func,
};

export default DownloadHandler(ExternalShareButton);
