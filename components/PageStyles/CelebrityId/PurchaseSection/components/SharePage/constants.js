
export const ShareContent = (starName, shareUrl, entityData) => ({
  title: `Personalized experiences from ${starName}. \nBook unique experiences like video shoutouts, direct messages, social media interactions, live calls and some special "fun" items.`,
  emailSubject: `Check out ${starName} on ${entityData?.partnerData.partner_name}.`,
  emailBody: `I thought you might be interested in seeing the experiences ${starName} is offering on their page. Here is the link, check it out: ${shareUrl}`,
  smsTitle: `Check out ${starName} on ${entityData?.partnerData.partner_name}`,
})
