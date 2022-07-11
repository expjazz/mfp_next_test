import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage } from '@fortawesome/pro-light-svg-icons';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'components/Sortable';
import {
  Wrapper,
  Ul,
  Li,
  Image,
  PlaceholderImage,
  NoImageText,
} from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { handleCommercialOfferings } from 'src/services';
const CommercialList = props => {
  const { t, ready } = useTranslation()
  const [list, setList] = useState(props.commercialList);

  const cardClick = item => () => {
    props.setTemplateState(true);
    props.cardClick(item);
  };

  const updateOrder = (commercial, oldIndex, newIndex, oldcommercialOrder) => {
    const payload = {
      title: commercial.title,
      description: commercial.description,
      price: commercial.price,
      order: oldcommercialOrder,
      sample_image: '',
    };
    props.loaderAction(true);
    const result = handleCommercialOfferings('edit', {
      ...payload,
      id: commercial.commercial_offering_id,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.commercial_offering) {
          const data = arrayMove(list, oldIndex, newIndex);
          setList(data);
          props.updateSortList(data);
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    try {
      if (oldIndex !== newIndex) {
        const oldcommercialOrder = list[newIndex].order;
        const commercial = list[oldIndex];
        updateOrder(commercial, oldIndex, newIndex, oldcommercialOrder);
      }
    } catch (e) {
      //
    }
  };

  const DragHandle = SortableHandle(() => (
    <span className="drag-wrper">
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
    </span>
  ));

  const SortableItem = SortableElement(({ commercial }) => (
    <Li onClick={cardClick(commercial)} key={commercial.commercial_offering_id}>
      <span className="content-wrap">
        <DragHandle />
        {isEmpty(commercial.sample_image) &&
          isEmpty(commercial.sample_image_original) && (
            <PlaceholderImage>
              <FontAwesomeIcon icon={faImage} size="3x" />
              <NoImageText>{t('common.noPhoto')}</NoImageText>
            </PlaceholderImage>
          )}
        {(commercial.sample_image || commercial.sample_image_original) && (
          <Image
            image={commercial.sample_image || commercial.sample_image_original}
          />
        )}
        <span className="right-content">
          <span className="head">{commercial.title}</span>
          <span className="text">{commercial.description}</span>
          <span className="amt-wrap">
            <span className="text">
              {commercial.hide && (
                <React.Fragment>
                  {' '}
                  - <span className="text hidden">{t('common.hidden')}</span>{' '}
                </React.Fragment>
              )}
            </span>
            <span className="text amount">
              USD ${numberToCommaFormatter(commercial.price)}
            </span>
          </span>
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
          <div {...scrollProps} id="commercial-list-scroll" />
        )}
      >
        <SortContainer onSortEnd={onSortEnd} useDragHandle>
          {list.map((commercial, index) => (
            <SortableItem
              key={`item-${commercial.commercial_offering_id}`}
              index={index}
              commercial={commercial}
            />
          ))}
        </SortContainer>
      </Scrollbars>
    </Wrapper>
  );
};

CommercialList.propTypes = {
  cardClick: PropTypes.func.isRequired,
  commercialList: PropTypes.array.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateSortList: PropTypes.func.isRequired,
  setTemplateState: PropTypes.func.isRequired,
  templateState: PropTypes.bool.isRequired,
};

export default CommercialList;
