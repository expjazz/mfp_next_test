import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  faTimes,
} from '@fortawesome/pro-regular-svg-icons';
import { useRouter } from 'next/router';
import {
  faPencil,
} from '@fortawesome/pro-light-svg-icons'
// import { queryParamUpdater } from 'utils/urlsUtils';
// import { parseQueryString } from 'src/utils/dataformatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getUpdatedRequest,
  sortFilterQuery,
} from '../../utils/queryUtils';
import {
  getAsStringForRouterFilter,
  getCountryKeys,
} from '../../utils';
import {
  prioSort,
  requests,
  sortList,
  usePriceList,
} from '../../constants';
import {
  List,
  ListItem,
} from './styled';
import { filterToQuery, queryParamUpdater } from '../../../../../src/utils/urlUtils';
import { useTranslation } from 'next-i18next';

const TagGenerator = (props) => {

  const priceList = usePriceList()
  const router = useRouter()
  const { t } = useTranslation()
  const hasFilter = () => {
    return (
      props.category.selected.length > 0 ||
      props.products !== '' ||
      (props.lowPrice != props.minRate && props.highPrice != props.maxRate) ||
      props.sortValue !== 'popularity' ||
      props.dynamicFilter !== ''
    )
  }

  const renderItem = (title, onClick=() => {}) => {
    return title ? (
      <ListItem key={title}>
        { title }
        <FontAwesomeIcon
          className='close-icon'
          icon={faTimes}
          onClick={onClick}
        />
      </ListItem>
    ) : null
  }

  const updateQueryFilter = (filterArr) => {
    filterArr.forEach(row => {
      if (row.value) {
        router.query[row.queryParam] = row.value
      } else {
        delete router.query[row.queryParam]
      }
    })
    router.push(router, getAsStringForRouterFilter(router), { shallow: true })
  }

  // const dynamicFilters = useMemo(() => {
  //   return [...prioSort];
  // }, [JSON.stringify(dynamicFilters)]);
  const dynamicFilters = []
  const priceItems = useMemo(() => {
    return priceList(props.minRate, props.maxRate);
  }, [props.minRate, props.maxRate])

  const { products } = router.query
  const getParentCat = () => {
    return  !props.selectedCategory?.parent ? props.selectedCategory?.slug : props.selectedCategory?.parentSlug
  }
  return (
    <List>
      {
        props.category.selected.map(catItem => (
          renderItem(catItem.title, () => {
            const selectedList = props.category.selected.filter(cat => cat.id !== catItem.id);
            const subKeys = selectedList.map(subCat => subCat.slug).join(',');
            if (subKeys) {
              updateQueryFilter([{queryParam:'sub_cat', value: sortFilterQuery(subKeys)}]);
            } else {
              props.updateSelectedSubCategory()
              router.push(`/category/${props.category.selected[0]?.parentSlug || getParentCat()}`, `/category/${props.category.selected[0]?.parentSlug || getParentCat()}`);
            }
          })
        ))
      }
      {
        requests(props.partnerData).map(requestItem => (
          props.products && props.products.indexOf(requestItem.key) >= 0 &&
            renderItem(t(requestItem.label), () => {
              const newRequestState = sortFilterQuery(
                getUpdatedRequest(requestItem.key, getUpdatedRequest(products)),
              );
              updateQueryFilter([{queryParam:'products', value: newRequestState}]);
            })
        ))
      }
      {
        props.sortValue !== sortList[0].value && renderItem(
          sortList.find(sortItem => sortItem.value === props.sortValue) &&
          t(sortList.find(sortItem => sortItem.value === props.sortValue).label),
          () => {
            updateQueryFilter([{queryParam:'sort', value: ''}]);
          }
        )
      }
      {
        renderItem(
          priceItems.find(priceItem => priceItem.high == props.highPrice && priceItem.low == props.lowPrice) &&
          (priceItems.find(priceItem => priceItem.high == props.highPrice && priceItem.low == props.lowPrice).label),
          () => {
            updateQueryFilter([{queryParam:'price', value: ''}]);
          }
        )
      }
      {
        renderItem(
          dynamicFilters.find(dynFil => dynFil.value === props.dynamicFilter) &&
          dynamicFilters.find(dynFil => dynFil.value === props.dynamicFilter).label,
          () => {
            updateQueryFilter([{queryParam:'filter', value: ''}]);
          }
        )
      }
      {
       props.starCountries.filter(country => props.countries.indexOf(country.id) >= 0)
        .map((country, index, array) => (
          renderItem(
            country.name,
            () => {
              updateQueryFilter([{queryParam:'countries', value:
              getCountryKeys(props.countries, array.filter(con => con.id !== country.id))}]);
            }
          )
        ))
      }

      {
        props.toggleFilterCall &&
          <FontAwesomeIcon
            className='edit-icon'
            icon={faPencil}
            onClick={props.toggleFilterCall}
          />
      }
    </List>
  )
}

TagGenerator.defaultProps = {
  minRate: '',
  maxRate: '',
  toggleFilterCall: false,
  starCountries: [],
}

TagGenerator.propTypes = {
  category: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  lowPrice: PropTypes.number.isRequired,
  highPrice: PropTypes.number.isRequired,
  dynamicFilters: PropTypes.array.isRequired,
  sortValue: PropTypes.string.isRequired,
  products: PropTypes.string.isRequired,
  dynamicFilter: PropTypes.string.isRequired,
  toggleFilterCall: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  minRate: PropTypes.string,
  maxRate: PropTypes.string,
  starCountries: PropTypes.array,
};

// const mapStateToProps = state => ({
//   category: state.filters.category,
//   lowPrice: state.filters.lowPrice,
//   highPrice: state.filters.highPrice,
//   countries: state.filters.countries,
//   dynamicFilters: state.dynamicFilters.data,
//   dynamicFilter: state.filters.dynamicFilter,
//   sortValue: state.filters.sortValue,
//   products: state.filters.products,
//   minRate: state.config.data.min_rate,
//   maxRate: state.config.data.max_rate,
// });

export default TagGenerator
