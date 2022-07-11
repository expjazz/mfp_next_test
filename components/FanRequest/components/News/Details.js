import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import moment from 'moment';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { Li, Image, Content, Text } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useRouter } from 'next/router';

function Details(props) {
	const router = useRouter();
	const [getLocalSymbol, getLocalAmount] = props.currencyFunctions;
	const { t } = useTranslation();
	const [isSeen, updateSeen] = useState(props.isRead);
	const { activity = {} } = props;
	const { extra_details: details = {} } = activity;
	const { star_image: star = {} } = details;

	useEffect(() => {
		let timeout = null;
		if (!isSeen) {
			timeout = setTimeout(() => {
				updateSeen(true);
			}, 10000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const getContent = () => {
		if (details.item_type === 'discount') {
			return details.item_type.active_to ? (
				<Trans
					i18nKey="news.discount"
					values={{
						name: star.name,
						percentage: details.new_item.discount,
						date: moment(details.new_item.active_to).format('MMM D, YYYY'),
					}}
				>
					<span className="tal-name">{}</span> is offering a discount of
					<span>{}</span> until
					<span>{}</span>
				</Trans>
			) : (

				<Trans
					i18nKey="news.discount_no_date"
					values={{
						name: star.name,
						percentage: details.new_item.discount,
						date: moment(details.new_item.active_to).format('MMM D, YYYY'),
					}}
				>
					<span className="tal-name">{}</span> is offering a discount of
					<span>{}</span> until
					<span>{}</span>
				</Trans>        );
		} else if (details.item_type === 'fundraiser') {
			return (
				<Trans
					i18nKey="news.fundraiser"
					values={{
						name: star.name,
						amount: `${
							getLocalSymbol()
						}${numberToDecimalWithFractionTwo(
							getLocalAmount(details.new_item.goal_amount),
							false,
							false,
						)}`,
						charityname: details.new_item.charity,
					}}
				>
          Help <span className="tal-name">{}</span> raise <span>{}</span> for
					<span>{}</span>
				</Trans>
			);
		} else if (details.details === 'new' && details.new_item) {
			if (details.item_type === 'funstuff') {
				if (
					details.new_item.delivery_method_id === deliveryMethods.videoCalls
				) {
					return (
						<Trans
							i18nKey="news.new.new_live"
							values={{
								name: star.name,
								title: details.new_item.title,
								price: `${
									getLocalSymbol()
								}${numberToDecimalWithFractionTwo(
									getLocalAmount(details.new_item.price),
									false,
									false,
								)}`,
							}}
						>
							<span className="tal-name">{}</span> is now offering:
							<span>{}</span> for
							<span>{}</span>
						</Trans>
					);
				}

				return (
					<Trans
						i18nKey="news.new.new_fun"
						values={{
							name: star.name,
							title: details.new_item.title,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.price),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> is now offering
						<span>{}</span> for
						<span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'social') {
				return (
					<Trans
						i18nKey="news.new.new_social"
						values={{
							name: star.name,
							title: details.new_item.title,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.rate),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> is now offering new experiences
            on
						<span>{}</span> starting at <span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'dm_celebrity') {
				return (
					<Trans
						i18nKey="news.new.new_dm"
						values={{
							name: star.name,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.price),
								false,
								false,
							)}`,
						}}
					>
            It’s now time to have a conversation with
						<span className="tal-name">{{}}</span>, for
						<span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'merch') {
				return (
					<Trans
						i18nKey="news.new.new_merch"
						values={{
							name: star.name,
							title: details.new_item.title,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.price),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> just added <span>{}</span>
            for <span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'shoutout_celebrity') {
				return (
					<Trans
						i18nKey="news.new.new_shoutout"
						values={{
							name: star.name,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.rate),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> is now delivering video
            shoutouts for
						<span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'announcement_celebrity') {
				return (
					<Trans
						i18nKey="news.new.new_event"
						values={{
							name: star.name,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.rate),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> will announce your upcoming
            event for
						<span>{}</span>
					</Trans>
				);
			} else if (details.item_type === 'qa_celebrity') {
				return (
					<Trans
						i18nKey="news.new.new_qa"
						values={{
							name: star.name,
							price: `${
								getLocalSymbol()
							}${numberToDecimalWithFractionTwo(
								getLocalAmount(details.new_item.rate),
								false,
								false,
							)}`,
						}}
					>
						<span className="tal-name">{}</span> will answer the question you
            always wanted to ask on video for <span>{}</span>
					</Trans>
				);
			}
		} else if (details.details === 'price_drop' && details.new_item) {
			let priceKey = 'rate';
			if (['merch', 'commercial', 'funstuff'].includes(details.item_type)) {
				priceKey = 'price';
			} else if (details.item_type === 'dm_celebrity') {
				priceKey = 'message_rate';
			}

			const newPrice = Number(details.new_item[priceKey]);
			const oldPrice = Number(details.old_item[priceKey]);
			let percentage = 0;
			if (newPrice < oldPrice) {
				percentage = parseInt(((oldPrice - newPrice) / oldPrice) * 100);
				if (details.item_type === 'funstuff') {
					if (
						details.new_item.delivery_method_id === deliveryMethods.videoCalls
					) {
						return (
							<Trans
								i18nKey="news.price_reduced_live"
								values={{
									name: star.name,
									percentage,
									title: details.new_item.title,
								}}
							>
								<span className="tal-name">{}</span> just lower the price on
								<span>{}</span>
								<span>{}</span>. Schedule your live interaction
							</Trans>
						);
					}
					return (
						<Trans
							i18nKey="news.price_reduced_fun"
							values={{
								name: star.name,
								percentage,
								title: details.new_item.title,
							}}
						>
							<span className="tal-name">{}</span> just reduced their price on
							<span>{}</span>
							<span>{}</span> Get it now!
						</Trans>
					);
				} else if (details.item_type === 'social') {
					return (
						<Trans
							i18nKey="news.price_reduced_social"
							values={{
								name: star.name,
								percentage,
							}}
						>
							<span className="tal-name">{}</span> lowered the price on some
              social media interactions
						</Trans>
					);
				} else if (details.item_type === 'dm_celebrity') {
					return (
						<Trans
							i18nKey="news.price_reduced_dm"
							values={{
								name: star.name,
								percentage,
							}}
						>
							<span className="tal-name">{}</span> just reduced their price on
              chats
							<span>{}</span>. Send a message
						</Trans>
					);
				} else if (details.item_type === 'merch') {
					return (
						<Trans
							i18nKey="news.price_reduced_merch"
							values={{
								name: star.name,
								percentage,
								title: details.new_item.title,
							}}
						>
							<span className="tal-name">{}</span> just lowered the price on
							<span>{}</span>
						</Trans>
					);
				} else if (
					details.item_type === 'shoutout_celebrity' ||
          details.item_type === ''
				) {
					return (
						<Trans
							i18nKey="news.price_reduced_shoutout"
							values={{
								name: star.name,
								percentage,
							}}
						>
							<span className="tal-name">{}</span> just reduced their price on
              shoutouts
							<span>{}</span>. Get one now!
						</Trans>
					);
				}
			}
		}
		return '';
	};

	const navigate = data => {
		if (data.item_type === 'shoutout_celebrity') {
			router.push(`/${star.slug}/shoutout/shoutout`);
		} else if (data.item_type === 'announcement_celebrity') {
			router.push(`/${star.slug}/shoutout/event`);
		} else if (data.item_type === 'qa_celebrity') {
			router.push(`/${star.slug}/shoutout/qa`);
		} else if (data.item_type === 'social') {
			router.push(`/${star.slug}/social/${data.slug}`);
		} else if (data.item_type === 'merch') {
			router.push(`/${star.slug}/merch/${data.new_item.slug}`);
		} else if (data.item_type === 'dm_celebrity') {
			router.push(`/${star.slug}/chat`);
		} else if (data.item_type === 'funstuff') {
			if (data.new_item.delivery_method_id === deliveryMethods.videoCalls) {
				router.push(`/${star.slug}/live/${data.new_item.slug}`);
			} else {
				router.push(`/${star.slug}/fun/${data.new_item.slug}`);
			}
		} else if (
			details.item_type === 'discount' ||
      details.item_type === 'fundraiser'
		) {
			router.push(`/${star.slug}`);
		} else if (data.item_type === '') {
			router.push(`/${star.slug}/shoutout`);
		}
	};

	return (
		<React.Fragment>
			<Li
				key={activity.id}
				onClick={() => {
					navigate(details);
					// if (props.onMarkAsRead && !props.isRead)
					//   props.onMarkAsRead(props.group);
				}}
				isRead={isSeen}
			>
				<div className="flex-content">
					<div className="flex-content">
						<Image image={star.thumbnail_url || star.image_url} />
						<Content>
							<Text>{getContent()}</Text>
							<span className="time">{getTime(activity.created_at, true)}</span>
						</Content>
					</div>
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			</Li>
		</React.Fragment>
	);
}

Details.propTypes = {
	activity: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	// onMarkAsRead: PropTypes.oneOfType([PropTypes.func, null]),
	// group: PropTypes.string,
	isRead: PropTypes.bool,
};
Details.defaultProps = {
	// onMarkAsRead: null,
	// group: '',
	isRead: true,
};
export default Details;
