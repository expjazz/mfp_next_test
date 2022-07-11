import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage } from '@fortawesome/pro-light-svg-icons';
import { handleDigitalGoods } from 'src/services/';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'components/Sortable';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import {
  Wrapper,
  Ul,
  Li,
  Image,
  PlaceholderImage,
  NoImageText,
} from './styled';

const FunList = props => {
  const { t, ready } = useTranslation();
  const [list, setList] = useState(props.funList);

  const cardClick = item => () => {
    props.cardClick(item);
  };

  const updateOrder = (fun, oldIndex, newIndex, oldProductOrder) => {
    const payload = { ...fun, order: oldProductOrder, sample_image: '' };
    props.loaderAction(true);
    const result = handleDigitalGoods('edit', {
      ...payload,
      id: fun.fun_stuff_id,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.fun_stuff) {
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
        const oldProductOrder = list[newIndex].order;
        const product = list[oldIndex];
        updateOrder(product, oldIndex, newIndex, oldProductOrder);
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

  const SortableItem = SortableElement(({ fun }) => (
    <Li onClick={cardClick(fun)} key={fun.fun_stuff_id}>
      <span className="content-wrap">
        <DragHandle />
        {isEmpty(fun.sample_image) && (
          <PlaceholderImage>
            <FontAwesomeIcon icon={faImage} size="3x" />
            <NoImageText>{t('common.noPhoto')}</NoImageText>
          </PlaceholderImage>
        )}
        {!isEmpty(fun.sample_image) && <Image image={fun.sample_image} />}
        <span className="right-content">
          <span className="head">
            {fun.title}
            {fun.delivery_method === deliveryMethods.videoCalls &&
              fun.meeting_duration > 0 &&
              ` - ${fun.meeting_duration} ${t('common.time.minute', { count: fun.meeting_duration })}`}
          </span>
          <span className="text">{fun.description}</span>
          <span className="amt-wrap">
            <span className="text">
              {t('services.sold')}: {fun.sold}/{fun.quantity}{' '}
              {fun.hide && (
                <React.Fragment>
                  {' '}
                  - <span className="text hidden">{t('common.hidden')}</span>{' '}
                </React.Fragment>
              )}
            </span>
            <span className="text amount">
              USD ${numberToCommaFormatter(fun.price)}
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
        renderView={scrollProps => <div {...scrollProps} id="funlist-scroll" />}
      >
        <SortContainer onSortEnd={onSortEnd} useDragHandle>
          {list.map((fun, index) => (
            <SortableItem
              key={`item-${fun.fun_stuff_id}`}
              index={index}
              fun={fun}
            />
          ))}
        </SortContainer>
      </Scrollbars>
    </Wrapper>
  );
};

FunList.propTypes = {
  cardClick: PropTypes.func.isRequired,
  funList: PropTypes.array.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateSortList: PropTypes.func.isRequired,
};

export default FunList;
