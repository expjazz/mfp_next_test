import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import BackHeader from 'components/BackHeader';
import { Layout, Heading, Image, ContentWrapper } from './styled';

const ContentDisplay = ({
  title,
  isIdeas,
  image,
  content,
  goBack,
  onCategoryChange,
  dropContent,
  dropVal,
}) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <BackHeader backHandler={goBack} label={t('common.tools')} noHelp />
      {image && <Image isIdeas={isIdeas} src={image} alt={title} />}
      <Heading isIdeas={isIdeas}>{title}</Heading>
      <ContentWrapper
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <Dropdown
        rootClass="drop-down"
        secondary
        overflowRender
        selected={dropVal}
        options={dropContent}
        labelKey="label"
        valueKey="value"
        onChange={onCategoryChange}
        placeHolder={t('common.select_category')}
      />
    </Layout>
  );
};

ContentDisplay.defaultProps = {
  isIdeas: false,
};

ContentDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  isIdeas: PropTypes.func,
  dropVal: PropTypes.object.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  dropContent: PropTypes.array.isRequired,
};

export default ContentDisplay;
