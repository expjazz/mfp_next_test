import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage } from '@fortawesome/pro-light-svg-icons';
// import { featuedExp } from 'services/video';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'components/Sortable';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { Close } from 'styles/CommonStyled';
import {
  Wrapper,
  Ul,
  Li,
  Image,
  PlaceholderImage,
  NoImageText,
} from './styled';
import { featuedExp } from 'src/services/video';

const FeaturedList = props => {
  const { t, ready } = useTranslation();
  const [list, setList] = useState(props.featuredList);

  const onRemove = item => () => {
    props.loaderAction(true);
    featuedExp('delete', {}, item.id)
      .then(res => {
        if (res && res.data && res.data.data) {
          setList(res.data.data.featured);
          props.updateSortList(res.data.data.featured);
          if (!isEmpty(res.data.data.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: {
                ...props.celbDetails,
                services: res.data.data.services,
              },
            });
          }
        }
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.removeSuccess'),
          variant: 'success',
        });
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.removeFail'),
          variant: 'error',
        });
      });
  };

  const updateOrder = (featured, oldIndex, newIndex, oldProductOrder) => {
    const payload = { order: oldProductOrder };
    props.loaderAction(true);
    const result = featuedExp(
      'post',
      {
        ...payload,
      },
      featured.id,
    );
    result
      .then(res => {
        props.loaderAction(false);
        if (res && res.data && res.data.data) {
          setList(res.data.data.featured);
          props.updateSortList(res.data.data.featured);
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.update_failed'),
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    setList(props.featuredList);
  }, [props.featuredList.length]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    try {
      if (oldIndex !== newIndex) {
        const oldProductOrder = list[newIndex].order;
        const product = list[oldIndex];
        updateOrder(product, oldIndex, newIndex, oldProductOrder);
      }
    } catch (e) {
      //
    }
  };

  const getFeaturedImage = (image, type) => {
    if (image) {
      return image;
    } else if (type === requestTypesKeys.shoutout) {
      return '/images/shoutout.jpg'
    } else if (type === requestTypesKeys.event) {
      return '/images/announcement.jpg';
    } else if (type === requestTypesKeys.qa) {
      return '/images/question.jpg';
    }
  }

  const DragHandle = SortableHandle(() => (
    <span className="drag-wrper">
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
    </span>
  ));

  const SortableItem = SortableElement(({ featured }) => (
    <Li key={featured.id}>
      <span className="content-wrap">
        <DragHandle />
        {isEmpty(getFeaturedImage(featured.image, featured.request_type)) && (
            <PlaceholderImage>
              <FontAwesomeIcon icon={faImage} size="3x" />
              <NoImageText>{t('common.noPhoto')}</NoImageText>
            </PlaceholderImage>
          )}
        {(!isEmpty(getFeaturedImage(featured.image, featured.request_type)) &&
          <Image image={getFeaturedImage(featured.image, featured.request_type)} />
        )}
        <span className="right-content">
          <span className="head">
            {featured.title}
            {featured.delivery_method === deliveryMethods.videoCalls &&
              featured.meeting_duration > 0 &&
              ` - ${featured.meeting_duration} ${t('common.time.minute', { count: featured.meeting_duration })}`}
          </span>
          <span className="text">{featured.description}</span>
          <span className="amt-wrap">
            <span className="text">
              {t('services.sold')}: {featured.sold || 0}/{featured.limit}{' '}
              {featured.hide && (
                <React.Fragment>
                  {' '}
                  - <span className="text hidden">{t('common.hidden')}</span>{' '}
                </React.Fragment>
              )}
            </span>
          </span>
          <Close className="close" onClick={onRemove(featured)} />
        </span>
      </span>
    </Li>
  ));

  const SortContainer = SortableContainer(({ children }) => {
    return <Ul>{children}</Ul>;
  });

  return ready && (
    <Wrapper>
      <Scrollbars
        autoHide
        renderView={scrollProps => (
          <div {...scrollProps} id="featuredList-scroll" />
        )}
      >
        <SortContainer onSortEnd={onSortEnd} useDragHandle>
          {list.map((featured, index) => (
            <SortableItem
              key={`item-${featured.id}`}
              index={index}
              featured={featured}
            />
          ))}
        </SortContainer>
      </Scrollbars>
    </Wrapper>
  );
};

FeaturedList.propTypes = {
  onRemove: PropTypes.func.isRequired,
  featuredList: PropTypes.array.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateSortList: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
};

export default FeaturedList;
