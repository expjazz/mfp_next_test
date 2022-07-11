import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-light-svg-icons';
import { handleProducts } from 'src/services';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'components/Sortable';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import { Wrapper, Ul, Li, Image } from './styled';

const ProductList = props => {
  const { t, ready } = useTranslation();
  const [list, setList] = useState(props.productList);

  const cardClick = item => () => {
    props.cardClick(item);
  };

  const updateOrder = (product, oldIndex, newIndex, oldProductOrder) => {
    const payload = {
      ...product,
      order: oldProductOrder,
      product_image: '',
    };
    props.loaderAction(true);
    const result = handleProducts('edit', {
      ...payload,
      id: product.product_id,
    });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.products) {
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

  const SortableItem = SortableElement(({ product }) => (
    <Li onClick={cardClick(product)} key={product.product_id}>
      <span className="content-wrap">
        <DragHandle />
        {product.product_image && product.product_image.length > 0 && (
          <Image image={product.product_image[0]} />
        )}
        <span className="right-content">
          <span className="head">{product.title}</span>
          <span className="text">{product.description}</span>
          <span className="amt-wrap">
            <span className="text">
              {t('services.sold')}: {product.sold}/{product.quantity}{' '}
              {product.hide && (
                <React.Fragment>
                  {' '}
                  - <span className="text hidden">{t('common.hidden')}</span>{' '}
                </React.Fragment>
              )}
            </span>
            <span className="text amount">
              USD ${numberToCommaFormatter(product.price)}
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
          <div {...scrollProps} id="product-list-scroll" />
        )}
      >
        <SortContainer onSortEnd={onSortEnd} useDragHandle>
          {list.map((product, index) => (
            <SortableItem
              key={`item-${product.product_id}`}
              index={index}
              product={product}
            />
          ))}
        </SortContainer>
      </Scrollbars>
    </Wrapper>
  );
};

ProductList.propTypes = {
  cardClick: PropTypes.func.isRequired,
  productList: PropTypes.array.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateSortList: PropTypes.func.isRequired,
};

export default ProductList;
