import React from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ToolTip from '../ToolTip';
import { LabelWrap, Text } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const entity = value => value

const SampleLabel = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();

  return (
    <LabelWrap className="custom-label-sample">
      <ToolTip title={t('common.sampleBookingsNote',  { purchaser: entityData?.partnerData?.purchaser_plural_name })}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </ToolTip>
      <Text>
        <Trans i18nKey='common.sampleTitle'>
          SAMPLE <br />
          BOOKING
        </Trans>
      </Text>
    </LabelWrap>
  );
};

SampleLabel.propTypes = {};

export default SampleLabel;
