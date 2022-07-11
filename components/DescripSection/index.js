import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import fitty from 'fitty';
import Truncate from 'react-truncate';
import { useTranslation } from 'next-i18next';
// import ReqCTA from '../ReqCTA';
import constants from './constants.json';
import { LeftDesc, RightDesc, TextWrapper, DescWrapper } from './styled';
import { More, Name } from '../PageStyles/CelebrityId/styled';
import { useMedia, useResizeObserver } from '../../customHooks/domUtils';
import ReqCTA from 'components/PageStyles/CelebrityId/components/ReqCTA';
import StarDetails from 'components/PageStyles/CelebrityId/components/StarDetails';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';

const DescripSection = ({
  starName,
  fullName,
  headline,
  starId,
  setShowHow,
  description,
  responseTime,
  starDetLoaded,
  ...props
}) => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 1279px)');
  const { data: { isBookable } } = useGetCelebrityData()
  const [expanded, expandDesc] = useState(false);
  const [descWidth, setDescWidth] = useState(0);
  const [showDesc, toggDesc] = useState(false);
  const rootRef = useRef(null);

  useResizeObserver(rootRef, dimen => {
    setDescWidth(dimen.width);
  });

  const autoFitText = () => {
    const fitProps = isMobile ? constants.mobile : constants.desktop;
    try {
      if (document.getElementById(`mainName-${starId}`)) {
        fitty(`#mainName-${starId}`, {
          minSize: fitProps.minNameSize,
          maxSize: fitProps.maxNameSize,
          multiLine: true,
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    setTimeout(() => {
      toggDesc(true);
    }, 2000);
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      autoFitText();
    });
    autoFitText();
  }, [starName, isMobile]);

  return (
    <DescWrapper isExpanded={expanded} description={!!description}>
      <LeftDesc>
        <TextWrapper ref={rootRef}>
          <Name className="talent-name" id={`mainName-${starId}`}>
            {fullName}
          </Name>
        </TextWrapper>
        {
          !isMobile &&
            <StarDetails />
          }
        {description && (
          <Truncate
            key={showDesc}
            width={descWidth}
            lines={!expanded && (isMobile ? 2 : 3)}
            ellipsis={
              <More onClick={() => expandDesc(true)}>{t('common.more')}</More>
            }
            className="LinesEllipsis"
          >
            {description}
            {expanded ? (
              <More onClick={() => expandDesc(false)}>{t('common.close')}</More>
            ) : null}
          </Truncate>
        )}
      </LeftDesc>
      <RightDesc>
        <ReqCTA setShowHow={setShowHow} isBookable={isBookable} />
      </RightDesc>
    </DescWrapper>
  );
};

DescripSection.propTypes = {
  starName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  starId: PropTypes.string.isRequired,
  responseTime: PropTypes.number.isRequired,
  starDetLoaded: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
};

// const mapStateToProps = state => ({
//   headline: state.starDetails.celebDetails.celebrityDetails.headline,
//   responseTime:
//     state.starDetails.celebDetails.celebrityDetails.average_response_value,
//   starName: state.starDetails.celebDetails.userDetails.shortName,
//   fullName: state.starDetails.celebDetails.userDetails.starName,
//   description: state.starDetails.celebDetails.celebrityDetails.description,
//   starDetLoaded: state.starDetails.celebDetails.starDetLoaded,
//   starId: state.starDetails.celebDetails.userDetails.user_id,
// });

export default DescripSection
