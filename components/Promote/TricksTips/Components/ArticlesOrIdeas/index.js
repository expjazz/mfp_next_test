import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropdown from 'components/Dropdown';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
// import { setArtView } from 'services/userManagement';
import { EmptyText } from 'styles/CommonStyled';
import { Heading } from 'styles/TextStyled';
import ListCard from '../ListCard';
import ContentDisplay from './components/ContentDisplay';
import { Container, Wrap, ModalWrap } from './styled';
import { useRouter } from 'next/router';
import { setArtView } from 'src/services/myfanpark/celebActions';

const ArticlesOrIdeas = props => {
  const { t } = useTranslation();
  const router = useRouter()
  const setInitialDropVal = () => {
    const { category } = router.query;
    console.log(props.categoryList, 'cat list', 'lslslslslslslsls')
    return (
      props.categoryList.find(drop => drop.value === category) ||
      props.categoryList[0] ||
      {}
    );
  };

  const [dropVal, setDropVal] = useState(setInitialDropVal());
  const [selectContent, setContent] = useState(null);

  const onCategoryChange = newDrop => {
    if (props.storeKey === 'ideas') {
      router.push(
        newDrop.value
          ? `/manage/promote/tips&tricks/tip-inspirations?category=${newDrop.value}`
          : '/manage/promote/tips&tricks/tip-inspirations',
          undefined, { shallow: true });
    } else {
      router.push(
        newDrop.value
          ? `/manage/promote/tips&tricks/tip-experts?category=${newDrop.value}`
          : '/manage/promote/tips&tricks/tip-experts',
      undefined, { shallow: true });
    }
    setDropVal(newDrop);
  };

  const onContentSelect = content => () => {
    if (content) {
      props.modalBackHandler(false);
    } else {
      props.modalBackHandler(true);
    }
    if (content && content.id) {
      setArtView(content.id);
    }
    setContent(content);
  };

  const fetchList = low => {
    props.fetchList(low, dropVal.value)
  };

  const onContentCatChange = newDropVal => {
    onCategoryChange(newDropVal);
    onContentSelect(null)();
  };

  useEffect(() => {
    props.fetchList(0, dropVal?.value || props.categoryList?.[0]?.value)
  }, [dropVal?.value, props.categoryList]);

  if (selectContent) {
    return (
      <Container>
        <ModalWrap>
          <Scrollbars
            autoHide
            className="scroll-root"
            renderView={scrollProps => (
              <div {...scrollProps} id="inner-scroll" />
            )}
          >
            <Wrap>
              <ContentDisplay
                title={selectContent.title}
                image={selectContent.image}
                isIdeas={props.storeKey === 'ideas'}
                content={selectContent.processed_contents}
                dropContent={props.categoryList}
                dropVal={dropVal}
                onCategoryChange={onContentCatChange}
                goBack={onContentSelect(null)}
              />
            </Wrap>
          </Scrollbars>
        </ModalWrap>
      </Container>
    );
  }

  return (
    <Container>
      <Scrollbars
        autoHide
        className="scroll-root"
        renderView={scrollProps => <div {...scrollProps} id="inner-scroll" />}
      >
        <Wrap>
          <Heading className="title">{props.heading}</Heading>
          <Dropdown
            className="drop-down"
            secondary
            selected={dropVal}
            options={props.categoryList}
            labelKey="label"
            valueKey="value"
            onChange={onCategoryChange}
            placeHolder={t('common.select_category')}
          />
          <Pagination
            classes={{ root: 'pagination-wrapper' }}
            offset={props.listData?.offset}
            count={props.listData?.count}
            limit={props.listData?.limit}
            dataLoading={props.listData?.loading}
            onChange={fetchList}
          />
          <section>
            {!props.listData?.loading &&
              props.listData?.data.map(content => (
                <ListCard
                  heading={content.title}
                  image={content.image}
                  isIdeas={props.storeKey === 'ideas'}
                  description={content.processed_contents}
                  onClick={onContentSelect(content)}
                />
              ))}
          </section>
          {!props.listData?.loading &&
            props.listData?.data.length === 0 && (
              <EmptyText className="empty-completed-text">
                {props.noDataText}
              </EmptyText>
            )}
          {!props.listData?.loading &&
            props.listData?.count > props.listData?.offset &&
            props.listData?.data.length > 0 && (
              <Pagination
                classes={{ root: 'pagination-wrapper' }}
                offset={props.listData?.offset}
                count={props.listData?.count}
                limit={props.listData?.limit}
                dataLoading={props.listData?.loading}
                onChange={fetchList}
              />
            )}
        </Wrap>
        {props.listData?.loading && <Loader class="loader-wrap" />}
      </Scrollbars>
    </Container>
  );
};

ArticlesOrIdeas.defaultProps = {
  categoryList: [],
};

ArticlesOrIdeas.propTypes = {
  location: PropTypes.object.isRequired,
  storeKey: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  categoryList: PropTypes.array,
  heading: PropTypes.string.isRequired,
  actionKey: PropTypes.string.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
  noDataText: PropTypes.string.isRequired,
};

// const mapStates = state => ({
//   articles: state.marketing.articles,
//   ideas: state.marketing.ideas,
// });

// function mapDispatch(dispatch) {
//   return {
//     fetchArticles: (offset, category) =>
//       dispatch(fetchArticles(offset, category)),
//     fetchIdeas: (offset, category) => dispatch(fetchIdeas(offset, category)),
//   };
// }

export default ArticlesOrIdeas
