import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'src/utils/dataStructures' ;
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import TextArea from 'components/TextArea';
import ConfirmRoute from 'components/ConfirmRoute';
import { Heading, Description } from 'styles/TextStyled';
import { Container } from '../../../styled';
import { Wrap } from './styled';
import { capitalize } from '@material-ui/core';
import { useRouter } from 'next/router';

const Offlimit = props => {
  const router = useRouter()
  const { t, ready } = useTranslation();
  const [offLimit, setOffLimit] = useState(props.celbDetails.off_limit_topics);
  const { celbDetails } = props;
  const offLimitChange = event => {
    setOffLimit(event.target.value);
    props.confirmSave({ saved: false, route: 'off-limit' });
  };

  const saveChanges = () => {
    const payload = { off_limit_topics: offLimit };
    if (
      !isEqual(
        {
          off_limit_topics: celbDetails.off_limit_topics,
        },
        payload,
      )
    ) {
      props.updateUserDetails(props.userDetails.id, {
        celebrity_details: { ...payload },
        user_details: {},
      });
    }
  };

  useEffect(() => {
    if (props.celbDetails.off_limit_topics !== offLimit) {
      props.confirmSave({ saved: false, route: 'off-limit' });
    } else {
      props.confirmSave({ saved: true, route: '' });
    }
  }, [props.celbDetails.off_limit_topics, offLimit]);

  return ready && (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/services/preferences/off-limit"
        confirmSave={props.confirmSave}
      />
      <Container>
        <Wrap className="content-wrapper">
          <Heading className="inner-head">{t('services.offLimit.heading')}</Heading>
          <Description className="note-padding">
            {t('services.offLimit.description', {
              purchaser: capitalize(props?.entityData?.purchaser_singular_name)
            })}
          </Description>
          <Scrollbars
            autoHide
            renderView={scrollProps => (
              <div {...scrollProps} id="offlimit-scroll" />
            )}
          >
            <TextArea
              autoSize
              inputProps={{
                value: offLimit,
                onChange: offLimitChange,
              }}
            ></TextArea>

            <FlexCenter className="save-button">
              <Button onClick={saveChanges}>{t('common.save')}</Button>
            </FlexCenter>
          </Scrollbars>
        </Wrap>
      </Container>
    </React.Fragment>
  );
};

Offlimit.propTypes = {
  celbDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};

Offlimit.defaultProps = {};

export default Offlimit;
