export const localeEntity = locale => {
  if (!process.env.NEXT_PUBLIC_PREVIEW_MODE || process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return { entityToken: process.env.NEXT_PUBLIC_STARSONA_US_TOKEN,
      entityId: process.env.NEXT_PUBLIC_STARSONA_US_ENTITY_ID }
  }
  switch (locale) {
    case 'en-ZA':
      return { entityToken: process.env.NEXT_PUBLIC_TTWITHME_ZA_TOKEN,
      entityId: process.env.NEXT_PUBLIC_TTWITHME_ZA_ENTITY_ID }
    case 'en-CA':
      return { entityToken: '9daa527e-f732-4feb-a6d4-abf9760123c5',
      entityId: 'MYFANPARK-CA-1' }
    case 'en-IN':
      return { entityToken:'e3009b76-f188-4613-b224-0127e74aaf9d',
      entityId: 'MYFANPARK-IN-1' }
    case 'en-NG':
      return { entityToken: 'ec37bbdc-f517-4433-9ba8-cc467975a21b',
        entityId: 'MYFANPARK-NG-1' }
    case 'de':
      return { entityToken: '06c82bea-779c-44fa-a045-4eac7812f91d',
      entityId: 'MYFANPARK-DE-1' }
    default:
      return { entityToken: process.env.NEXT_PUBLIC_TTWITHME_US_TOKEN,
      entityId: process.env.NEXT_PUBLIC_TTWITHME_US_ENTITY_ID }
  }
}