// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
import 'cypress-file-upload';
import { activateTalent, createNewTalent, createNewTalentWithoutApproval } from './talent-support';

const { generateDm, cancelAllBookingsPerUser, generateShoutout, generateSocialMedia, generateFunStuff, generateAudioFunStuff, generateTextFunStuff, fileUploadFunStuff, photoUploadFunStuff, generateMerch, generateCommercial, commercialApproval, generateClarification, generateDmAndFulfill } = require("./bookings-support");
const { talentLogin, unapprovedTalentLogin, fanLogin } = require('./loginUtils')
const { drag } = require("./drag-support");
const { MailSlurp } = require("mailslurp-client");

const apiKey = Cypress.env("MAILSLURPKEY");
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId);
});
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('drag', drag)

Cypress.Commands.add('generateDm', generateDm)

Cypress.Commands.add('cancelAllBookingsPerUser', cancelAllBookingsPerUser)

Cypress.Commands.add('generateShoutout', generateShoutout)

Cypress.Commands.add('generateSocialMedia', generateSocialMedia)

Cypress.Commands.add('generateFunStuff', generateFunStuff)

Cypress.Commands.add('generateAudioFunStuff', generateAudioFunStuff)

Cypress.Commands.add('generateTextFunStuff', generateTextFunStuff)

Cypress.Commands.add('fileUploadFunStuff', fileUploadFunStuff)

Cypress.Commands.add('photoUploadFunStuff', photoUploadFunStuff)

Cypress.Commands.add('generateMerch', generateMerch)

Cypress.Commands.add('talentLogin', talentLogin)

Cypress.Commands.overwrite('contains', (originalFn, subject, filter, text, options = {}) => {
  // determine if a filter argument was passed
  if (typeof text === 'object') {
    options = text
    text = filter
    filter = undefined
  }

  options.matchCase = false

  return originalFn(subject, filter, text, options)
})

Cypress.Commands.add('forceClick', {prevSubject: 'element'}, (subject, options) => {
  cy.wrap(subject).click({force: true})
});

Cypress.Commands.add('createNewTalent', createNewTalent)

Cypress.Commands.add('createNewTalentWithoutApproval', createNewTalentWithoutApproval)

Cypress.Commands.add('unapprovedTalentLogin', unapprovedTalentLogin)

Cypress.Commands.add('fanLogin', fanLogin)

Cypress.Commands.add('generateCommercial', generateCommercial)

Cypress.Commands.add('commercialApproval', commercialApproval)

Cypress.Commands.add('generateClarification', generateClarification)

Cypress.Commands.add('generateDmAndFulfill', generateDmAndFulfill)

Cypress.Commands.add('activateTalent', activateTalent)