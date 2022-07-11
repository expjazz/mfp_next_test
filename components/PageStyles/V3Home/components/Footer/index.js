import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FooterContainer, OutterContainer, Divider} from './styled';
import { isVodacom } from 'customHooks/domUtils';


function Footer() {
	const [state, setState] = useState(new Array(5).fill(false));
	const [first, setFirst] = useState(false);
	const [second, setSecond] = useState(false);
	const [third, setThird] = useState(false);
	const [fourth, setFourth] = useState(false);
	const [fifth, setFifth] = useState(false);
	const t = key => {
		const hash = {
			'v3_footer.first': 'Our talent offers a variety of unique and personalized experiences for their fans. Find the star you love to see all of their offerings. Then, select your experience and complete the online form and payment. That’s it. The hardest part will be waiting a few days as your star completes your order. We promise it will make your day!',
			'v3_footer.second': 'As each star manages their own orders personally, it’s up to them to decide when, where and how they complete it. For video messages, they have a maximum of 7 days to record. Other experiences (depending on their nature) can take a bit longer. No worries, we keep in touch with our stars regularly so nobody forgets about an order.',
			'v3_footer.third': 'The moment your order is fulfilled, you’ll receive an email/text to notify you. For video messages, DMs and Social Interactions, you will also receive a link where you can view, download or share your order. For Live calls, you’ll get a confirmation of the date & time to diarise, with a link for the Zoom call. All of your orders will also be updated in your profile, so you can always log in to view the status of your order or download your experiences, once completed.',
			'v3_footer.fourth': isVodacom() ? 'You will never be charged for an experience you don’t get. If for any reason a talent cancels your order or neglects to complete it before the expiry date,or if you decide to cancel your own order, you won’t be charged and the charges to your card will be reversed.' :  'You will never be charged for an experience you don’t get. When you place an order, we take a hold of the amount on your card. If for any reason a talent cancels your order or neglects to complete it before the expiry date, the hold on your card will be released and you won’t be charged.',
			'v3_footer.fifth': 'Each of our talent determines their own price for each of their experiences and offerings. Have a look at their profiles to see what they charge.'
		};
		return hash[key];

	};
	const setArray = index => {
		const temp = new Array(5).fill(false);
		temp[index] = true;
		setState(temp);
	};
	const footerArr = [
		{content: t('v3_footer.first'),
			question: 'How does it work?'},
		{content: t('v3_footer.second'),
			question: 'How long does it take to get my order?'},
		{content: t('v3_footer.third'),
			question: 'How do I get my order?'},
		{content: t('v3_footer.fourth'),
			question: 'What if a talent does not complete my order?'},
		{content: t('v3_footer.fifth'),
			question: 'How much does it cost?'},

	];

	return (
		<OutterContainer>

			<FooterContainer>
				<div className="child">
					<h3>
          Have questions?
						<br />
          Let&apos;s answer them
					</h3>
				</div>
				<div className="list">
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
					>
						{
							footerArr.map((row, index) => (

								<React.Fragment key={row.content}>

									<ListItem onClick={() => setArray(index)}>
										<ListItemText primary={row.question} />
										<FontAwesomeIcon icon={state[index] ? faChevronUp : faChevronDown} className="search-icon"/>

									</ListItem>
									<Collapse in={state[index]} timeout="auto" unmountOnExit>


										<List component="div" disablePadding>
											<ListItem button disablePadding class="inside-list">
												<div className="small">


													<ListItemText primary={row.content} />
												</div>
											</ListItem>
										</List>

									</Collapse>
									<Divider />
								</React.Fragment>
							))
						}
					</List>
				</div>
			</FooterContainer>
		</OutterContainer>
	);
}

export default Footer;
