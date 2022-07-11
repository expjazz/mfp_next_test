import dynamic from 'next/dynamic';

const NameAndPhotoRoot = dynamic(() => import('./components/NameAndPhoto'))

const ProfileVideoRoot =  dynamic(() => import('./components/ProfileVideo'))

const BioRoot =  dynamic(() => import('./components/Bio'))

const IndustryRoot =  dynamic(() => import('./components/Industry'))

const TagsRoot =  dynamic(() => import('./components/Tags'))

const SocialHandlesRoot =  dynamic(() => import('./components/SocialHandles'))

const SetPriceAndCharityRoot =  dynamic(() => import('./components/SetPriceAndCharity'))

const Charity =  dynamic(() => import('./components/Charity'))

const PageDesign =  dynamic(() => import('./components/PageDesign'))

export {
  NameAndPhotoRoot,
  ProfileVideoRoot,
  BioRoot,
  IndustryRoot,
  TagsRoot,
  SocialHandlesRoot,
  SetPriceAndCharityRoot,
  Charity,
  PageDesign,
};
