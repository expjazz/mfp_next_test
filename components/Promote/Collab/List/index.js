import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'components/Sortable';
import { Image, Close } from 'styles/CommonStyled';
import { Ul, Li } from './styled';
import { getCollab } from 'src/services/myfanpark/celebActions';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';

function Collablist({ list = [], onDelete, vanity, ...props }) {
  const { t } = useTranslation();
  const dispatch = useGeneral()[1]
  const [colList, setList] = useState(list);
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const updateOrder = (collab, oldIndex, newIndex, oldProductOrder) => {
    const payload = { order: oldProductOrder };
    loaderAction(true);
    const result = getCollab(
      collab.id,
      {
        ...payload,
      },
      'post',
      true,
    );
    result
      .then(res => {
        loaderAction(false);
        if (res) {
          setList(res);
          props.updateSortList(res);
        }
      })
      .catch(() => {
        loaderAction(false);
        localUpdateToast({
          value: true,
          message: t('common.update_order_fail'),
          variant: 'error',
        });
      });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    try {
      if (oldIndex !== newIndex) {
        const oldProductOrder = list[newIndex].order;
        const collab = list[oldIndex];
        updateOrder(collab, oldIndex, newIndex, oldProductOrder);
      }
    } catch (e) {
      //
    }
  };
  useEffect(() => {
    setList(list);
  }, [list.length]);

  const DragHandle = SortableHandle(() => (
    <span className="drag-wrper">
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
      <FontAwesomeIcon className="drag-icon" icon={faEllipsisV} />
    </span>
  ));

  const SortableItem = SortableElement(({ star }) => (
    <Li key={star.id}>
      <DragHandle />
      <span className="img-wrp">
        <Image
          className="img-star"
          image={star.image.thumbnail_url || star.image.image_url}
        />
        <span className="content">
          <span className="cat">{star.category.title}</span>
          <Link href={`/${star.vanity}`} target="_blank">
            <a>
              <span className="name">{star.name}</span>
            </a>
          </Link>
        </span>
      </span>
      <Close className="close" onClick={() => onDelete(star)} />
    </Li>
  ));

  const SortContainer = SortableContainer(({ children }) => {
    return <Ul>{children}</Ul>;
  });

  return (
    <Scrollbars
      autoHide
      renderView={scrollProps => (
        <div {...scrollProps} id="cross-talent-scroll" />
      )}
    >
      <SortContainer onSortEnd={onSortEnd} useDragHandle>
        {colList.map((star, index) => (
          <SortableItem index={index} star={star} key={`item-${star.id}`} />
        ))}
      </SortContainer>
    </Scrollbars>
  );
}

Collablist.propTypes = {
  list: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateSortList: PropTypes.func.isRequired,
  vanity: PropTypes.string.isRequired,
};

export default Collablist;
