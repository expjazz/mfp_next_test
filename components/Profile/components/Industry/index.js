import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import { Heading, Description, LinkText } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import MultiSelect from 'components/MultiSelect';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import { FlexCenter } from 'styles/CommonStyled';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
// import { fetchTagsList, setNewTag } from 'services/getTagsList';
import NestedSelect from 'components/NestedSelect';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import RequestFlowPopup from 'components/RequestFlowPopup';
import { Layout, Wrapper, UploadContainer } from './styled';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { isEmpty } from 'src/utils/dataStructures';
import { fetchTagsList, setNewTag } from 'src/services/myfanpark/tagsActions';
import { useGetPartner, useGetProfessions } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

const Industry = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const { data: professionsList } = useGetProfessions()
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { data: userData } = useFetchLoggedUser()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const [selectedProfessions, setselectedProfessions] = useState(
    userData?.celebrity_details?.profession_details
      ? userData?.celebrity_details?.profession_details
      : [],
  );
  const [showBrowseCategory, setshowBrowseCategory] = useState(false);
  const [categories, setcategories] = useState({
    subCategoriesArray: [],
    selectedCategory: [],
  });

  const [selectedTags, setselectedTags] = useState(userData?.celebrity_details?.tags
    .filter(tag => tag.celebrity_profession_tag)
    .map(tag => ({ label: tag.name, value: tag.id, notClearable: true })) || []);
  const [professionTags, setProfessiontags] = useState([]);
  const [tagList, settagList] = useState([]);
  const [createTag, setCreateTag] = useState('');
  const [newTagList, setNewTagList] = useState([]);
  const [notSaved, setNotSaved] = useState(false);
  const [globalToast, setGlobalToast] = useState(false);

  const onSuccess = (globaltoast = false) => () => {
    props.confirmSave({ saved: true, route: '' });
    if (globaltoast) setGlobalToast(true);
    if (selectedProfessions.length > 0) {
      setshowBrowseCategory(false);
      setGlobalToast(false);
      localUpdateToast({
        value: true,
        message: t('common.update_success'),
        variant: 'success',
        global: false,
      });
    } else {
      localUpdateToast({
        value: true,
        message:
          'Please add at least one industry as well so your profile is visible to fans.',
        variant: 'info',
        global: false,
      });
    }
  };

  const browserCategory = () => {
    setshowBrowseCategory(true);
  };

  const onBack = () => {
    setshowBrowseCategory(false);
    localUpdateToast({
      value: false,
      message: '',
      variant: '',
      global: false,
    });
  };

  const getSubCategoryList = id => {
    let { professions } = professionsList;
    professions = professions.filter(profession => profession.id === id);
    professions[0].child.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    setcategories({
      subCategoriesArray: professions[0].child,
      selectedCategory: professions,
    });
  };
  const getSelectedCategoryList = profession => {
    let selctedProfessions;
    if (selectedProfessions.find(cat => cat.id === profession.id)) {
      selctedProfessions = selectedProfessions.filter(
        cat => cat.id !== profession.id,
      );
      setselectedProfessions(selctedProfessions);
    } else if (selectedProfessions.length < 3) {
      selctedProfessions = [...selectedProfessions, profession];
      setselectedProfessions(selctedProfessions);
    }
  };

  /* tag */

  useEffect(() => {
    if (userData?.celebrity_details?.tags) {
      const existingTags = userData?.celebrity_details?.tags.map(
        tag => ({
          label: tag.name,
          value: tag.id,
          notClearable: tag.celebrity_profession_tag,
        }),
      );
      setselectedTags(existingTags);
      const newProfessionTags = userData?.celebrity_details?.tags
        .filter(tag => tag.celebrity_profession_tag)
        .map(tag => ({ label: tag.name, value: tag.id, notClearable: true }));
      setProfessiontags(newProfessionTags);
    }
  }, [userData?.celebrity_details?.tags]);

  const setTag = async newTag => {
    loaderAction(true);
    try {
      const result = await setNewTag(newTag);
      setCreateTag('');
      let finalSelectedTags = selectedTags;
      result.data.tags.forEach(tag => {
        finalSelectedTags = finalSelectedTags.map(selectedTag => {
          if (selectedTag.label === tag.name) {
            return {
              label: tag.name,
              value: tag.id,
              notClearable: tag.celebrity_profession_tag,
            };
          }
          return selectedTag;
        });
        setselectedTags(finalSelectedTags);
      });
      const finalUserDetails = {
        celebrity_details: {
          tags: finalSelectedTags
            .filter(tag => !tag.notClearable)
            .map(selectedTag => selectedTag.value),
        },
        user_details: {},
      };
      props.updateUserDetails(
        userData?.user?.id,
        finalUserDetails,
        onSuccess(false),
      );
      setNewTagList([]);
    } catch (exception) {
      loaderAction(false);
      if (
        exception.response &&
        exception.response.data &&
        exception.response.data.error
      ) {
        localUpdateToast({
          value: true,
          message: exception.response.data.error.message,
          variant: 'error',
          global: false,
        });
      } else {
        localUpdateToast({
          value: true,
          message: t('common.refresh_error'),
          variant: 'error',
          global: false,
        });
      }
    }
  };

  const saveTags = () => {
    if (!isEmpty(newTagList)) {
      setTag(newTagList);
    } else {
      const finalUserDetails = {
        celebrity_details: {
          tags: selectedTags
            .filter(tag => !tag.notClearable)
            .map(selectedTag => selectedTag.value),
        },
        user_details: {},
      };
      props.updateUserDetails(
        userData?.user?.id,
        finalUserDetails,
        onSuccess(false),
      );
    }
  };

  const saveIndustry = (globaltoast = false) => {
    const finalUserDetails = {
      celebrity_details: {
        profession: selectedProfessions.map(profession => profession.id),
      },
      user_details: {},
    };
    props.updateUserDetails(
      userData?.user?.id,
      finalUserDetails,
      onSuccess(globaltoast),
    );
  };

  const addToSelectedTags = newTag => {
    setNewTagList([...newTagList, { name: newTag }]);
  };

  const ListAdornment = tagName => (
    <Wrapper.Adornment onClick={() => addToSelectedTags(createTag)}>
      {t('common.profilesec.create')} <div className="tagName">{tagName} </div>{' '}
    </Wrapper.Adornment>
  );

  const handleOptionPillClick = chosenTags => {
    const missingPtag = professionTags.find(pTag => {
      return !chosenTags.find(cTag => cTag.value === pTag.value);
    });
    if (!missingPtag) {
      setselectedTags(chosenTags);
    }
  };

  const searchTags = async typedList => {
    let isExistingTag = false;
    const list = typedList.trim();
    if (list && list.length <= 30) {
      if (list.length > 2) {
        const tagsList = await fetchTagsList(list, dispatch);
        tagsList.forEach(tag => {
          if (tag.label.toLowerCase() === list.toLowerCase()) {
            isExistingTag = true;
          }
        });
        selectedTags.forEach(selectedTag => {
          if (selectedTag.label.toLowerCase() === list.toLowerCase()) {
            isExistingTag = true;
          }
        });
        settagList(tagsList);
        props.confirmSave({ saved: false, route: 'industry' });
        if (!isExistingTag) {
          setCreateTag(list);
        } else {
          setCreateTag('');
        }
      }
    }
  };
  const debouncedTags = useMemo(
    () => debounce(searchTags, 300),
    []
  )
  const handleMultiSelectTag = debouncedTags

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.goBack();
    }
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.goBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const browserCategoryList = () => {
    const professionsListArr = professionsList?.allProfessions || [];
    return (
      <UploadContainer.ItemWrapper>
        {professionsListArr.map(profession => {
          return (
            <UploadContainer.Item
              key={profession.id}
              onClick={() => getSubCategoryList(profession.id)}
              selected={categories.selectedCategory.find(
                cat => cat.id === profession.id,
              )}
              className="categoryItem"
            >
              {profession.entity_title ? profession.entity_title : profession.title}
            </UploadContainer.Item>
          );
        })}
      </UploadContainer.ItemWrapper>
    );
  };

  const showSubCategoryList = () => {
    return (
      <React.Fragment>
        <div className="right-section">
          <div className="subCategoryHeading">
            {t('common.profilesec.industry_desc')}
            <span>
              {t('common.profilesec.char_remaining', {
                count: 3 - selectedProfessions.length,
              })}
            </span>
          </div>

          <UploadContainer.SubItemWrapper>
            {categories.subCategoriesArray.map(profession => {
              return (
                <UploadContainer.Item
                  key={profession.id}
                  onClick={() => getSelectedCategoryList(profession)}
                  selected={selectedProfessions.find(
                    cat => cat.id === profession.id,
                  )}
                >
                  {profession.entity_title ? profession.entity_title : profession.title}
                </UploadContainer.Item>
              );
            })}
          </UploadContainer.SubItemWrapper>
        </div>
      </React.Fragment>
    );
  };

  const handleMultiSelect = list => {
    if (list.length < 4) {
      setselectedProfessions(list);
      setshowBrowseCategory(false)
      props.confirmSave({ saved: false, route: 'industry' });
    }
  };

  const handleSave = (globaltoast = false) => {
    saveIndustry(globaltoast);
    saveTags();
  };

  const handleFocusSelect = () => {};

  const onInputClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const onTagClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    let latestTagList = [];
    if (!isEmpty(newTagList)) {
      latestTagList = newTagList.filter(tag => {
        return selectedTags.find(chosenItem => chosenItem.label === tag.name);
      });
    }
    setNewTagList(latestTagList);
  }, [selectedTags]);

  const renderContent = () => {
    const { subcategories } = professionsList;
    subcategories.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    selectedProfessions.map(function(obj) {
      obj.label = obj.title;
      obj.value = obj.id;
    });
    let nestedProfessions = professionsList.allProfessions;
    nestedProfessions = nestedProfessions.map(item => {
      const newOption = {};
      newOption.label = item.title;
      newOption.value = item.id;
      if (item.child) {
        newOption.options = item.child.map(childItem => {
          const childOption = { ...childItem };
          childOption.label = childItem.title;
          childOption.value = childItem.id;
          return childOption;
        });
      }
      return newOption;
    });

    return (
      <UploadContainer.Wrapper>
        {showBrowseCategory && (
          <RequestFlowPopup modalView smallPopup>
            <UploadContainer.BrowseCategoryWrapper globalToast={globalToast}>
              <BackHeader
                backHandler={onBack}
                label={t('common.profilesec.industry_back')}
                noHelp
              />
              <UploadContainer.DesktopView>
                <Heading>{t('common.profilesec.browse_categories')}</Heading>
                <Scrollbars id="browse-category-list">
                  <UploadContainer.BrowseCategoryContainer>
                    {browserCategoryList()}
                    {showSubCategoryList()}
                  </UploadContainer.BrowseCategoryContainer>
                </Scrollbars>
              </UploadContainer.DesktopView>
              <UploadContainer.MobileView globalToast={globalToast}>
                <Heading>{t('common.profilesec.browse_categories')}</Heading>
                <UploadContainer.BrowseCategoryContainer className="mobile-select-category">
                  <Description>
                    {t('common.profilesec.tag_desc', {
                      purchaser: entityData?.partnerData?.purchaser_plural_name,
                    })}
                  </Description>
                  <NestedSelect
                    value={selectedProfessions}
                    options={nestedProfessions}
                    placeholder=""
                    noOptionsMessage={t('common.profilesec.no_cat_found')}
                    onChange={handleMultiSelect}
                    onFocus={handleFocusSelect}
                  />
                  <FlexCenter className="btn-wrpr">
                    <Button type="submit" onClick={() => handleSave(true)}>
                      {t('common.save')}
                    </Button>
                  </FlexCenter>
                </UploadContainer.BrowseCategoryContainer>
              </UploadContainer.MobileView>
            </UploadContainer.BrowseCategoryWrapper>
          </RequestFlowPopup>
        )}
        {!showBrowseCategory && (
          <React.Fragment>
            <UploadContainer.CategoriesWrapper className="fans-want">
              <Description className="description">
                {t('common.profilesec.tag_desc', {
                  purchaser: entityData?.partnerData?.purchaser_plural_name,
                })}
              </Description>
              {selectedProfessions.length >= 3 && (
                <Description className="bold-desc">
                  {t('common.profilesec.limit3_error')}
                </Description>
              )}
              <MultiSelect
                value={selectedProfessions}
                options={subcategories}
                label={t('common.profilesec.industriesCap')}
                onChange={handleMultiSelect}
                onFocus={handleFocusSelect}
                onInputClick={onInputClick}
                noOptionsMessage={t('common.profilesec.no_category')}
              />
              <Description className="desc-pad">
                {t('common.profilesec.not_finding_one')}{' '}
                <LinkText onClick={browserCategory}>
                  {t('common.profilesec.browse_categories')}
                </LinkText>
              </Description>
            </UploadContainer.CategoriesWrapper>
          </React.Fragment>
        )}
      </UploadContainer.Wrapper>
    );
  };

  const renderTagContent = () => {
    return (
      <React.Fragment>
        <UploadContainer.CategoriesWrapper className="fans-want tag-container">
          <Description className="description">
            {t('common.profilesec.tag_note', {
              purchaser: entityData?.partnerData?.purchaser_plural_name,
            })}
          </Description>
          <MultiSelect
            value={selectedTags}
            options={tagList}
            label={t('common.profilesec.tags')}
            dataCy='tagsField'
            menuListAdornment={createTag ? ListAdornment(createTag) : ''}
            onChange={handleOptionPillClick}
            onInputChange={handleMultiSelectTag}
            onFocus={handleFocusSelect}
            onInputClick={onTagClick}
            noOptionsMessage={t('common.profilesec.no_tags_found')}
          />
        </UploadContainer.CategoriesWrapper>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/profile/page-design"
        confirmSave={props.confirmSave}
      />
      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}
      <Layout>
        <BackHeader
          backHandler={backHandler}
          label={t('common.design')}
          closeHandler={backHandler}
          noHelp
        />
        <Heading className="title">
          {t('common.profilesec.best_known_for')}
        </Heading>
        <Wrapper>
          {renderContent()} {renderTagContent()}
        </Wrapper>
        <FlexCenter className="btn-wrpr">
          <Button type="submit" onClick={() => handleSave(false)}>
            {t('common.save')}
          </Button>
        </FlexCenter>
      </Layout>
    </React.Fragment>
  );
};

Industry.propTypes = {
  userDetails: PropTypes.object,
  professionsList: PropTypes.object,
  updateUserDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};

Industry.defaultProps = {
  userDetails: {},
  professionsList: {},
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
//   professionsList: state.professionsList,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     updateUserDetails: (id, obj, onSuccess) =>
//       dispatch(updateUserDetails(id, obj, onSuccess, false, true)),
//     fetchTagsList: searchParam => dispatch(fetchTagsList(searchParam)),
//     updateToast: obj => dispatch(updateToast({ ...obj })),
//     loaderAction: state => dispatch(loaderAction(state)),
//   };
// }

export default Industry
