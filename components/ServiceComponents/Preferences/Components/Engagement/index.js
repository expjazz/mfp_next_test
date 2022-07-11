import React, { useState, useEffect } from 'react';
import { capitalize } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEqual } from 'src/utils/dataStructures' ;
import Checkbox from 'components/Checkbox';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import ConfirmRoute from 'components/ConfirmRoute';
import { Heading, Description } from 'styles/TextStyled';
import { List } from './constants';
import { Container, Ul, Li } from '../../../styled';
import { Wrap } from './styled';
import { useRouter } from 'next/router';

const Engagement = props => {
  const router = useRouter()
  const { t, ready } = useTranslation();
  const [checkList, updateCheckList] = useState(List(t));
  const { celbDetails } = props;
  const handleCheck = state => value => {
    const temp = [...checkList];
    const index = temp.findIndex(elm => elm.state === state);
    temp[index].active = value;
    updateCheckList(temp);
  };

  const isEqualPayload = () => {
    const payload = checkList.reduce((accumulator, currentValue) => {
      return { ...accumulator, [currentValue.state]: currentValue.active };
    }, {});
    return isEqual(
      {
        allow_comment: celbDetails.allow_comment,
        allow_reaction: celbDetails.allow_reaction,
        allow_rating: celbDetails.allow_rating,
      },
      payload,
    );
  };

  const saveChanges = () => {
    const payload = checkList.reduce((accumulator, currentValue) => {
      return { ...accumulator, [currentValue.state]: currentValue.active };
    }, {});
    if (!isEqualPayload()) {
      props.updateUserDetails(props.userDetails.id, {
        celebrity_details: { ...payload },
        user_details: {},
      });
    }
  };

  const linkStatus = link => {
    const linkItem = { ...link };
    switch (link.state) {
      case 'allow_comment':
        linkItem.active = celbDetails.allow_comment;
        return linkItem;
      case 'allow_reaction':
        linkItem.active = celbDetails.allow_reaction;
        return linkItem;
      case 'allow_rating':
        linkItem.active = celbDetails.allow_rating;
        return linkItem;
      default:
        return linkItem;
    }
  };

  const getCheckList = () => {
    return checkList.map(link => {
      return linkStatus(link);
    });
  };

  useEffect(() => {
    updateCheckList(getCheckList());
    if (!isEqualPayload()) {
      props.confirmSave({ saved: false, route: 'engagement' });
    } else {
      props.confirmSave({ saved: true, route: '' });
    }
  }, [
    celbDetails.allow_comment,
    celbDetails.allow_reaction,
    celbDetails.allow_rating,
  ]);

  useEffect(() => {
    if (!isEqualPayload()) {
      props.confirmSave({ saved: false, route: 'engagement' });
    } else {
      props.confirmSave({ saved: true, route: '' });
    }
  }, [
    celbDetails.allow_comment,
    celbDetails.allow_reaction,
    celbDetails.allow_rating,
    JSON.stringify(checkList),
  ]);

  return ready && (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/services/preferences/engagement"
        confirmSave={props.confirmSave}
      />
      <Container>
        <Wrap className="content-wrapper">
          <Heading className="inner-head">{t('services.engagement.heading', {
            purchaser: capitalize(props.entityData?.purchaser_singular_name)
          })}</Heading>
          <Description className="note-padding">
            {t('services.engagement.description')}
          </Description>
          <Scrollbars
            autoHide
            renderView={scrollProps => (
              <div {...scrollProps} id="preference-scroll" />
            )}
          >
            <Ul>
              {checkList &&
                checkList.map(link => {
                  return (
                    <Li className="list-item-preference" key={link.state}>
                      <span role="presentation">
                        <Checkbox
                          onChange={handleCheck(link.state)}
                          checked={link.active}
                        />
                      </span>
                      <Description>
                        <p className="main-text">{link.heading}</p>
                        {link.message}
                      </Description>
                    </Li>
                  );
                })}
            </Ul>
            <FlexCenter className="save-button">
              <Button
                onClick={saveChanges}
                disabled={isEqualPayload()}
                isDisabled={isEqualPayload()}
              >
                {t('common.save')}
              </Button>
            </FlexCenter>
          </Scrollbars>
        </Wrap>
      </Container>
    </React.Fragment>
  );
};

Engagement.propTypes = {
  celbDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  confirmSave: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
};

Engagement.defaultProps = {};

export default Engagement;
