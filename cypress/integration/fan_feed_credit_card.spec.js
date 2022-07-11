import axios from 'axios';
import 'cypress-iframe';
import { capitalize } from 'lodash';
import { optileObj } from '../support/optileUtils';

Cypress.on('uncaught:exception', err => !err.message.includes('ResizeObserver'));
const obj = {
	celebrity: cy.config().CELEBRITY_ID,
	language: cy.config().LANGUAGE_ID,
	'Content-Disposition': 'attachment',
	occasion: 5,
	public_request: true,
	request_details: cy.config().SHOUTOUT_DETAILS,
	request_type: 1,
};

const cypressCreditCardMsg = 'Cypress credit card msg';
const instagramLink = 'www.instagram.com/cypres_testing';
const messageObj = {
	celebrity: cy.config().CELEBRITY_ID,
	language: cy.config().LANGUAGE_ID,
	message: cypressCreditCardMsg,
	type: 'request',
};

const socialMediaObj = {
	celebrity: cy.config().CELEBRITY_ID,
	description: '',
	language: cy.config().LANGUAGE_ID,
	link: instagramLink,
	request_type: 6,
	social_media_title: cy.config().SOCIAL_ID,
	type: 'request',
};

const funStuffDescription = 'Cypress fun stuff';

const liveCallObj = {
	celebrity: cy.config().CELEBRITY_ID,
	description: funStuffDescription,
	fun_stuff_id: cy.config().LIVE_CALL_ID,
	language: cy.config().LANGUAGE_ID,
	type: 'request',
};

const funStuffObj = {
	celebrity: cy.config().CELEBRITY_ID,
	description: funStuffDescription,
	fun_stuff_id: cy.config().FUN_ID,
	language: cy.config().LANGUAGE_ID,
	type: 'request',
};

const merchObj = {
	celebrity: cy.config().CELEBRITY_ID,
	country: 'US',
	description: '',
	language: cy.config().LANGUAGE_ID,
	product_id: cy.config().MERCH_ID,
	shipping_address_1: 'cypress st',
	shipping_address_2: 'apt',
	shipping_city: 'Lisboa',
	shipping_country: 'Portugal',
	shipping_full_name: 'cypress',
	shipping_phone: '+13475831145',
	shipping_state: 'Lisboa',
	shipping_zip_code: '345223',
	type: 'request',
};


const authHeaders = {
	'authorization': `token ${cy.config().FAN_TOKEN}`,
	device: 'web',
	'Accept': 'application/json'
};

context('Fan Feed with credit card', () => {
	before(() => {
		cy.request({
			url: 'https://app.staging.starsona.com/v2/user/cancel_user_bookings/',
			method: 'GET',
			headers: {
				'authorization': `token ${cy.config().FAN_TOKEN}`,
				device: 'web',
				'Accept': 'application/json'
			}
		});
	});

	beforeEach(() => {
		cy.fanLogin();
	});

	describe('actions with credit card for simple bookings', {
		defaultCommandTimeout: 20000
	}, () => {

		it ('gets a notification for a dm using credit card', () => {
			// Creating the DM booking
			cy.request({
				url: 'https://app.staging.starsona.com/api/v2/message/direct_message/',
				method: 'POST',
				body: messageObj,
				headers: authHeaders
			}).then(resp => {
				expect(resp.status).to.eq(200);
				expect(resp.body.data.booking).to.be.a('string');
				expect(resp.body.data).to.have.property('details');
				const request = {
					id: resp.body.data.booking,
					...resp.body.data.details,
					rate: resp.body.data.details.rate.toFixed(2)
				};
				// generating optile obj
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.rate,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.rate), request.id)
					},
					headers: authHeaders
				}).then(resp => {
					expect(resp.status).to.eq(200);
					expect(Object.keys(resp.body.data).length).to.be.greaterThan(0);

					// test the charge api call
					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: authHeaders
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						// Checking to see if the found booking matches the created one
						cy.get('.time').contains('a minute ago').siblings('p').contains('DM requested').click({force: true});
						cy.get('p').contains(cypressCreditCardMsg);
					});
				});
			});
		});

		it ('gets a notification for social media', () => {
			cy.request({
				url: 'https://app.staging.starsona.com/api/v2/social_media/social_media_request/',
				method: 'POST',
				body: socialMediaObj,
				headers: authHeaders
			}).then(resp => {
				expect(resp.status).to.eq(200);
				expect(resp.body.data.booking).to.be.a('string');
				const request = {
					id: resp.body.data.booking,
					amount: '8.00'
				};
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.amount,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.amount), request.id)
					},
					headers: authHeaders
				}).then(resp => {
					expect(resp.status).to.eq(200);
					expect(Object.keys(resp.body.data).length).to.be.greaterThan(0);
					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: authHeaders
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						cy.get('.time').contains('a minute ago').siblings('p').contains('Social media interaction requested from');
						cy.get('.time').contains('a minute ago').click({force: true});
						// checking fan feed
						cy.contains(instagramLink);
					});
				});
			});
		});

		it ('gets a notification for a live call', () => {
			cy.request({
				url: 'https://app.staging.starsona.com/api/v2/fun_stuff/request_fun_stuff/',
				method: 'POST',
				body: liveCallObj,
				headers: authHeaders
			}).then(resp => {
				expect(resp.status).to.eq(200);
				expect(resp.body.data.booking).to.be.a('string');
				const request = {
					id: resp.body.data.booking,
					amount: '32.00'
				};
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.amount,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.amount), request.id)
					},
					headers: authHeaders
				}).then(resp => {
					expect(resp.status).to.eq(200);
					expect(Object.keys(resp.body.data).length).to.be.greaterThan(0);
					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: authHeaders
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						cy.get('.time').contains('a minute ago').siblings('p').contains('live call requested from');
						cy.get('.time').contains('a minute ago').click({force: true});
						// checking fan feed
						cy.contains(funStuffDescription);
					});
				});
			});
		});

		it ('gets a notification for a fun stuff', () => {
			cy.request({
				url: 'https://app.staging.starsona.com/api/v2/fun_stuff/request_fun_stuff/',
				method: 'POST',
				body: funStuffObj,
				headers: authHeaders
			}).then(resp => {
				expect(resp.status).to.eq(200);
				expect(resp.body.data.booking).to.be.a('string');
				const request = {
					id: resp.body.data.booking,
					amount: '32.00'
				};
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.amount,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.amount), request.id)
					},
					headers: authHeaders
				}).then(resp => {
					expect(resp.status).to.eq(200);
					expect(Object.keys(resp.body.data).length).to.be.greaterThan(0);
					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: authHeaders
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						cy.get('.time').contains('a minute ago').siblings('p').contains('Video recording requested');
						cy.get('.time').contains('a minute ago').click({force: true});
						cy.contains('Video recording', {timeout: 10000});
						// checking fan feed
						cy.contains(funStuffDescription);
					});
				});
			});
		});

		it ('gets a notification for a merch', () => {
			cy.request({
				url: 'https://app.staging.starsona.com/api/v2/products/request_product/',
				method: 'POST',
				body: merchObj,
				headers: authHeaders
			}).then(resp => {
				expect(resp.status).to.eq(200);
				expect(resp.body.data.booking).to.be.a('string');
				const request = {
					id: resp.body.data.booking,
					amount: '32.00'
				};
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.amount,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.amount), request.id)
					},
					headers: authHeaders
				}).then(resp => {
					expect(resp.status).to.eq(200);
					expect(Object.keys(resp.body.data).length).to.be.greaterThan(0);
					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: authHeaders
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						cy.get('.time', {timeout: 40000}).contains('a minute ago').siblings('p').contains('Merch test requested from');
						cy.get('.time').contains('a minute ago').click({force: true});
						cy.contains('Merch test', { timeout: 10000 });
					});
				});
			});
		});

		it ('gets a notification for a shoutout using a credit card', () => {
			const formData = new FormData();
			Object.keys(obj).forEach(key => {
				console.log(key, obj[key]);
				formData.append(key, obj[key]);
			});

			// Testing booking creation API
			axios({
				url: 'https://app.staging.starsona.com/api/v1/request/stargramz/',
				method: 'POST',
				data: formData,
				headers: {
					'authorization': `token ${cy.config().FAN_TOKEN}`,
					device: 'web',
					'Content-Type': 'multipart/form-data; Boundary=XXX',
					'Accept': 'application/json'
				}
			}).then(resp => {
				const request = resp.data.data.stargramz_response;
				expect(request).to.exist;
				expect(request.id).to.be.a('string');

				// Testing optile_pay_types API
				cy.request({
					url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
					method: 'POST',
					body: {
						amount: request.order_details.amount,
						currency: 'USD',
						starsona: request.id,
						type: 'booking',
						optile_data: optileObj(parseFloat(request.order_details.amount), request.id)
					},
					headers: {
						'authorization': `token ${cy.config().FAN_TOKEN}`,
						device: 'web',
						'Accept': 'application/json'
					}
				}).then(opt => {
					expect(opt.body.status).to.equal(200);
					// Testing charge api call from optile

					cy.request({
						url: `https://api.sandbox.oscato.com/pci/v1/${opt.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
						method: 'POST',
						body: {
							account: { verificationCode: '123' },
							browserData: {
								browserScreenHeight: 1117,
								browserScreenWidth: 1728,
								colorDepth: 30,
								javaEnabled: false,
								language: 'pt-BR',
								timezone: 'Europe/Lisbon'
							}
						},
						headers: {
							'authorization': `token ${cy.config().FAN_TOKEN}`,
							device: 'web',
							'Accept': 'application/json'
						}
					}).then(opt => {
						expect(opt.body.resultInfo).to.equal('Approved');

						cy.wait(5000);
						cy.visit('/fan-manage/my-videos');
						cy.intercept('GET', 'https://api.stream-io-api.com/api/v1.0/enrich/feed/notifications_aggregated_2/10334/?api_key=54fguh3vysvz&location=unspecified&withReactionCounts=true&withOwnReactions=true&limit=25&mark_seen=true').as('notification');
						cy.wait('@notification');
						cy.get('body')
							.then($body => {
								if ($body.get('a.raf-link')) {
									cy.get('a.raf-link').click();
								}
							});
						cy.get('.time').contains('a minute ago').siblings('p').contains('Video shoutout requested from');
						cy.get('.time').contains('a minute ago').click({force: true});
						cy.get('span').contains('testsuit');
						cy.contains('Occasio Birthday');
						cy.contains('For: Expedito');
					});
				});
			});
		});

	});
});