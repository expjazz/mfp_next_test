import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import MultiSelect from 'components/MultiSelect';
import { FlexCenter } from 'styles/CommonStyled';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
// import { fetchTagsList, setNewTag } from 'services/getTagsList';
import { Layout, Wrapper, UploadContainer } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { fetchTagsList, setNewTag } from 'src/services/myfanpark/tagsActions';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const Tags = props => {
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { data: userData } = useFetchLoggedUser()
  const { t } = useTranslation();
  const [selectedTags, setselectedTags] = useState([]);
  const [professionTags, setProfessiontags] = useState([]);
  const [tagList, settagList] = useState([]);
  const [createTag, setCreateTag] = useState('');
  const [newTagList, setNewTagList] = useState([]);

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
        });
      } else {
        localUpdateToast({
          value: true,
          message: t('common.refresh_error'),
          variant: 'error',
        });
      }
    }
  };
  const addToSelectedTags = newTag => {
    setNewTagList([...newTagList, { name: newTag }]);
  };

  const ListAdornment = tagName => (
    <Wrapper.Adornment onClick={() => addToSelectedTags(createTag)}>
      {t('common.profilesec.create')} <div className="tagName">{tagName} </div>{' '}
    </Wrapper.Adornment>
  );

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
      );
    }
  };

  const handleOptionPillClick = chosenTags => {
    const missingPtag = professionTags.find(pTag => {
      return !chosenTags.find(cTag => cTag.value === pTag.value);
    });
    if (!missingPtag) {
      setselectedTags(chosenTags);
    }
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

  const handleMultiSelect = async typedList => {
    let isExistingTag = false;
    const list = typedList.trim();
    if (list && list.length <= 30) {
      if (list.length > 2) {
        const tagsList = await props.fetchTagsList(list);
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
        if (!isExistingTag) {
          setCreateTag(list);
        } else {
          setCreateTag('');
        }
      }
    }
  };
  const handleFocusSelect = () => {};

  const renderContent = () => {
    return (
      <React.Fragment>
        <UploadContainer.CategoriesWrapper className="fans-want">
          <MultiSelect
            value={selectedTags}
            options={tagList}
            label={t('common.profilesec.tags')}
            menuListAdornment={createTag ? ListAdornment(createTag) : ''}
            onChange={handleOptionPillClick}
            onInputChange={handleMultiSelect}
            onFocus={handleFocusSelect}
            noOptionsMessage={t('common.profilesec.no_tags_found')}
          />
        </UploadContainer.CategoriesWrapper>
        <FlexCenter className="save-btn">
          <Button type="submit" onClick={saveTags}>
            {t('common.save')}
          </Button>
        </FlexCenter>
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <BackHeader
        backHandler={props.goBack}
        label="Page Setup"
        closeHandler={props.goBack}
        noHelp
      />
      <Heading className="title">{t('common.profilesec.tags_small')}</Heading>
      <Wrapper>
        <Description>{props.subTitle}</Description>
        {renderContent()}
      </Wrapper>
    </Layout>
  );
};

Tags.propTypes = {
  userDetails: PropTypes.object,
  updateUserDetails: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  fetchTagsList: PropTypes.func.isRequired,
  subTitle: PropTypes.string,
};

Tags.defaultProps = {
  userDetails: {},
  subTitle: '',
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
//   professionsList: state.professionsList,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
//     updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
//     loaderAction: state => dispatch(loaderAction(state)),
//     fetchTagsList: searchParam => dispatch(fetchTagsList(searchParam)),
//   };
// }

export default Tags
