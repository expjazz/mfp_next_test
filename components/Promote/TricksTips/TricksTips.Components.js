import React, { lazy, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import ErrorHandler from 'components/ErrorHandler';
import { Heading } from 'styles/TextStyled';
import MenuList from 'components/MenuList';
import { links } from './constants';
import { Layout } from './styled';
import { useMediaQuery } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useConfigPartner, useFetchIdeas, useTipsArticles } from 'customHooks/reactQueryHooks';
import { generalLoader, useGeneral } from 'src/context/general';

// const Playbook = lazy(() =>
//   retry(() => import('./Components/Playbook')),
// );

// const ArticlesOrIdeas = lazy(() =>
//   retry(() =>
//     import('./Components/ArticlesOrIdeas'),
//   ),
// );

const Playbook = dynamic(() => import('./Components/Playbook'))
const ArticlesOrIdeas = dynamic(() => import('./Components/ArticlesOrIdeas'), {
  ssr: false
})

function TricksTips(props) {
  const { data: configData } = useConfigPartner()
  const [{data: articles, isFetching: artLoading, isLoading: artFetching}, fetchArticles] = useTipsArticles(20)
  const [{data: ideas, isFetching: cLoading, isLoading: cFetching}, fetchIdeas] = useFetchIdeas(20)
  const router = useRouter()
  const pathname = router.asPath
  const [state, dispatch] = useGeneral()
  const artLoader = artFetching || artLoading
  const cLoader = cLoading || cFetching
  useEffect(() => {
    if (artLoader && slug[2] === 'tip-success') {
      generalLoader(dispatch, true)
    }
    if (cLoader && slug[2] === 'tip-experts') {
      generalLoader(dispatch, true)
    }
    if (!artLoader && !cLoader) {
      generalLoader(dispatch, false)
    }
  }, [cLoader, artLoader])
  const { slug } = router.query
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  let categoryArticles  = configData?.category_article ? configData.category_article.map((category) => {
    return ({
      label: category.category_title,
      value: category.category_id,
    })
  }): [];
  let categoryIdeas  = configData?.category_idea ? configData.category_idea.map((category) => {
    return ({
      label: category.category_title,
      value: category.category_id,
    })
  }): [];
  categoryIdeas = [{ label: 'All', value: '' }, ...categoryIdeas];
  categoryArticles = [{ label: 'All', value: '' }, ...categoryArticles];
  const getComponent = component => {
    return component;
  };

  return (
    <Layout>
      {isMobile &&
        pathname === '/manage/promote/tips&tricks' && (
          <React.Fragment>
            <Heading className="main-title">{t('common.tips_tricks')}</Heading>
            <MenuList links={links} classNames={{ root: 'tips-list' }} shallow/>
          </React.Fragment>
        )}
      {
        slug[2] === 'tip-success' && getComponent(
          <ErrorHandler>
            <Playbook {...props} />
          </ErrorHandler>,
        )
      }

      {
        slug[2] === 'tip-experts' && getComponent(
          <ErrorHandler>
            <ArticlesOrIdeas
              {...props}
              storeKey="articles"
              actionKey="fetchArticles"
              listData={articles}
              fetchList={fetchArticles}
              heading={t('common.tip_experts_heading')}
              noDataText={t('common.tip_experts_nodata')}
              categoryList={categoryArticles}
            />
        </ErrorHandler>,
        )
      }

      {
        slug[2] === 'tip-inspirations' && getComponent(
          <ErrorHandler>
            <ArticlesOrIdeas
                {...props}
                categoryList={configData?.ideaCategories}
                storeKey="ideas"
                listData={ideas}
                fetchList={fetchIdeas}
                heading={t('common.tip_inspirations_heading')}
                noDataText={t('common.tip_inspirations_nodata')}
                actionKey="fetchIdeas"
                categoryList={categoryIdeas}
              />
          </ErrorHandler>,
        )
      }

    </Layout>
  );
}

TricksTips.propTypes = {
  history: PropTypes.object.isRequired,
};

export default TricksTips;

// <Switch>
// <Route
//   path="/manage/promote/tips&tricks/tip-success"
//   render={propsChildren =>
//     getComponent(
//       <ErrorHandler>
//         <Playbook {...propsChildren} {...props} />
//       </ErrorHandler>,
//     )
//   }
// />
// <Route
//   path="/manage/promote/tips&tricks/tip-experts"
//   render={propsChildren =>
//     getComponent(
//       <ErrorHandler>
//         <ArticlesOrIdeas
//           {...propsChildren}
//           {...props}
//           storeKey="articles"
//           actionKey="fetchArticles"
//           heading={t('common.tip_experts_heading')}
//           noDataText={t('common.tip_experts_nodata')}
//           categoryList={props.configData?.articleCategories}
//         />
//       </ErrorHandler>,
//     )
//   }
// />
// <Route
//   path="/manage/promote/tips&tricks/tip-inspirations"
//   render={propsChildren =>
//     getComponent(
//       <ErrorHandler>
//         <ArticlesOrIdeas
//           {...propsChildren}
//           {...props}
//           categoryList={props.configData?.ideaCategories}
//           storeKey="ideas"
//           heading={t('common.tip_inspirations_heading')}
//           noDataText={t('common.tip_inspirations_nodata')}
//           actionKey="fetchIdeas"
//         />
//       </ErrorHandler>,
//     )
//   }
// />
// </Switch>