/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { customFontIcon } from 'src/constants/';
import { cloneDeep, isEqual } from 'src/utils/dataStructures';
import ToolTip from 'components/ToolTip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { requestTypesKeys } from 'src/constants/requestTypes';
import Checkbox from 'components/Checkbox';
import Input from 'components/TextInput';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import { Panel, Content } from 'components/Accordian';
import ConfirmRoute from 'components/ConfirmRoute';
import BoostFans from '../BoostFans';
import { Ul, Li, InputWrapper } from '../styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const Social = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [_, getLocalAmount] = useGetLocalAmount()
  const { t, ready } = useTranslation();
  const [expanded, setExpanded] = useState('');
  const [promote, showPromote] = useState(false);
  const [socialDetails, setDetails] = useState([]);
  const [payload, setPayload] = useState([]);

  const updatePayload = (tObj, state, value, id) => {
    const req = cloneDeep([...payload]);
    const rIndex = req.findIndex(item => item.id === id);
    if (rIndex >= 0) {
      const rObj = req[rIndex];
      rObj[state] = value;
      req[rIndex] = rObj;
    } else {
      req.push(tObj);
    }
    setPayload(req);
  };

  const findUpdate = (key, id, value, state) => {
    const temp = cloneDeep(socialDetails);
    const index = temp.findIndex(item => item.social_media === key);
    if (index >= 0) {
      const { details } = temp[index];
      if (details) {
        const dIndex = details.findIndex(item => item.id === id);
        if (dIndex >= 0) {
          const tObj = details[dIndex];
          tObj[state] = value;
          details[dIndex] = tObj;
          temp[index].details = details;
          updatePayload(tObj, state, value, id);
          setDetails(temp);
        }
      }
    }
  };

  const handleSocialCheck = (key, id) => value => {
    findUpdate(key, id, value, 'checked');
    props.confirmSave({ saved: false, route: 'social' });
  };

  const inputChange = ({ key, id }) => event => {
    let {
      target: { value },
    } = event;
    if (value === '0') {
      return;
    }
    const regex = new RegExp(`\\USD|\\s|\\$|,`, 'g');
    value = value.replace(regex, '');
    if (/^\d*\.?\d*$/.test(value) && value < 9999999) {
      findUpdate(key, id, value, 'amount');
    }
    props.confirmSave({ saved: false, route: 'social' });
  };

  const triggerAccordian = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  const validate = () => {
    return (
      isEqual(props.socialDetails, socialDetails) ||
      payload.find(
        value => value.checked && (!value.amount || value.amount === ''),
      )
    );
  };

  const saveChanges = () => {
    props.submitHandler(payload, socialDetails);
  };

  const scrollElement = scrolPos => {
    window.scroll(0, scrolPos);
  };

  const scrollHandler = (e, time, offset) => {
    const topHeight =
      props.topHeight && props.topHeight.current
        ? props.topHeight.current.clientHeight + props.pageOffset
        : 0;
    const threshold = (topHeight + offset) / 100;
    let curTime = 0;
    let scrolPos = 0;
    while (curTime <= time) {
      scrolPos += threshold;
      setTimeout(scrollElement, curTime, scrolPos);
      curTime += time / 100;
    }
  };

  const scrollTo = element => {
    const offset = {
      instagram: 0,
      twitter: 40,
      facebook: 80,
      linkedin: 120,
      tiktok: 180,
    };
    try {
      if (window.requestAnimationFrame) {
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            const elmnt = document.getElementById(element);
            if (elmnt) {
              scrollHandler(elmnt, 250, offset[element]);
            }
          });
        });
      }
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    setDetails(cloneDeep(props.socialDetails));
  }, []);

  useEffect(() => {
    setDetails(cloneDeep(props.socialDetails));
  }, [JSON.stringify(props.socialDetails)]);

  useEffect(() => {
    scrollTo(expanded);
  }, [expanded]);

  useEffect(() => {
    props.confirmSave({ saved: true, route: 'social' });
  }, []);

  const getComponent = type => {
    switch (type) {
      case 'instagram':
        return (
          <span className="socil-icon-wrp">
            <FontAwesomeIcon className="social-icon" icon={faInstagram} />
          </span>
        );
      case 'facebook':
        return (
          <span className="socil-icon-wrp">
            <FontAwesomeIcon className="social-icon" icon={faFacebookF} />
          </span>
        );
      case 'twitter':
        return (
          <span className="socil-icon-wrp">
            <FontAwesomeIcon className="social-icon" icon={faTwitter} />
          </span>
        );
      case 'tiktok':
        return (
          <span className="socil-icon-wrp">
            <FontAwesomeIcon
              className="social-icon"
              icon={customFontIcon.tikTok}
            />
          </span>
        );
      case 'linkedin':
        return (
          <span className="socil-icon-wrp">
            <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
          </span>
        );
      default:
        return null;
    }
  };

  const getTextInput = (
    { state, value, error, nativeProps, label, errorMsg, activeLabel, id },
    inputVal,
  ) => {
    return (
      <InputWrapper className="input-wrp" key={`social-${state}-${id}`}>
        <Input
          inputProps={{
            nativeProps,
            defaultProps: { value, onChange: inputChange(state), id },
            labelObj: {
              label,
              activeLabel,
            },
          }}
        />
        {props.currencyData.abbr !== 'USD' && (
          <span className="convert-price has-margin">
            {
              t('common.approxCurrency', {
                name: props.currencyData.abbr,
                symbol: props.currencyData.symbol,
                amount: numberToDecimalWithFractionTwo(
                  getLocalAmount(inputVal),
                  false,
                  false,
                )
              })
            }
          </span>
        )}
        {error && <span className="label-input error-red">{errorMsg}</span>}
      </InputWrapper>
    );
  };

  const getList = (media, details) => {
    if (details && details.length > 0) {
      return details.map(item => {
        return (
          <Li className="flex-col" key={`${media}-${item.id}`}>
            <Checkbox
              onChange={handleSocialCheck(media, item.id)}
              checked={item.checked}
              id={`${media}-${item.id}`}
              label={item.title}
            />
            {getTextInput(
              {
                label: t('services.social.priceLabel', {
                  amount: numberToCommaFormatter(
                    item.recommended_amount,
                  )
                }),
                activeLabel: t('common.price'),
                state: { key: media, id: item.id },
                value: `${item.amount ? `USD $` : ''}${
                  item.amount ? numberToCommaFormatter(item.amount) : ''
                }`,
                error: '',
                errorMsg: '',
                nativeProps: { type: 'text' },
                id: `input-${media}-${item.id}`,
              },
              item.amount,
            )}
          </Li>
        );
      });
    }
    return null;
  };
  return ready && (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl={props.validateUrl}
      />
      {socialDetails.map(link => {
        return (
          <Panel
            id={link.social_media}
            key={link.social_media}
            triggerAccordian={triggerAccordian(link.social_media)}
            expanded={expanded}
            label={link.social_media}
            component={getComponent(link.social_media)}
            tag={link.social_media}
            classes={{
              base: { root: 'panel-root', expanded: 'expanded-panel' },
              rest: {},
              summary: {},
            }}
          >
            <Content
              classes={{
                base: {
                  root: 'content_root',
                  rest: {},
                },
              }}
            >
              <Ul className="list-ul-panel">
                {getList(link.social_media, link.details)}
              </Ul>
            </Content>
          </Panel>
        );
      })}

      <FlexCenter className="button-wrp">
        <Button
          disabled={validate()}
          isDisabled={validate()}
          onClick={saveChanges}
        >
          {t('common.save')}
        </Button>
        {props.active &&
          props.entityData.allow_star_share_graphics &&
          props.celebActive &&
          props.adminApproved &&
          !props.isSaved && (
            <ToolTip title={t('services.promoteExperience')}>
              <Button
                secondary
                className="promote-btn"
                onClick={() => showPromote(!promote)}
              >
                {t('services.promote', {
                    purchaser: entityData?.partnerData?.purchaser_plural_name
                  })}
              </Button>
            </ToolTip>
          )}
      </FlexCenter>
      {props.entityData.allow_star_share_graphics &&
        props.celebActive &&
        props.adminApproved &&
        props.active &&
        (props.isSaved || promote) && (
          <BoostFans
            requestType={
              props.isPromotion
                ? requestTypesKeys.promotion
                : requestTypesKeys.socialShoutout
            }
            global={false}
          />
        )}
    </React.Fragment>
  );
};

Social.propTypes = {
  socialDetails: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
  saved: PropTypes.object.isRequired,
};

Social.defaultProps = {};

export default Social;
