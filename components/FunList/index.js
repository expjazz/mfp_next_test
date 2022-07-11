import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import Button from '../../components/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDownload } from '@fortawesome/pro-regular-svg-icons';
// import { FlexCenter } from 'styles/CommonStyled';
// import { LinkText } from 'styles/TextStyled';
// import { TextInput } from 'components/TextField';
// import { Li, Image } from './styled';
import { isEmpty } from '../../src/utils/dataStructures';
import { FlexCenter } from '../../styles/CommonStyled';
import { LinkText } from '../../styles/TextStyled';
import { TextInput } from '../TextField';
import { Li, Image } from './styled';

const FunList = props => {
  const { t } = useTranslation();
  const [fileUrl, setFileUrl] = useState(
    props.fun.file ? URL.createObjectURL(props.fun.file) : '',
  );
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(props.funDescription);

  const changeDesc = event => {
    setDescription(event.target.value);
  };
  const editDesc = () => {
    if (edit && props.funDescription !== description) {
      props.editDesc(description);
    }
    setEdit(true);
  };

  useEffect(() => {
    setFileUrl(props.fun.file ? URL.createObjectURL(props.fun.file) : '');
  }, [props.fun.file_name]);

  useEffect(() => {
    setDescription(props.funDescription);
    setEdit(false);
  }, [props.funDescription]);

  if (props.funDescription) {
    return (
      <React.Fragment>
        <Li
          className={`fun-desc ${props.classes.root}`}
          hasImage={!isEmpty(props.fun.file_url)}
        >
          {edit ? (
            <TextInput
              multiline
              rowsMin={5}
              rowsMax="infinity"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: 'input-root',
                  multiline: 'input-textarea',
                },
              }}
              value={description}
              onChange={changeDesc}
            />
          ) : (
            props.funDescription
          )}
          {props.editable && (
            <FlexCenter>
              <Button className="edit-btn" onClick={editDesc}>
                {edit ? t('common.update') : t('common.edit')}
              </Button>
            </FlexCenter>
          )}
        </Li>
      </React.Fragment>
    );
  }

  return (
    <Li className={props.classes.root} hasImage={!isEmpty(props.fun.file_url)}>
      {props.close && (
        <FontAwesomeIcon
          icon={faTimes}
          className="close-btn"
          onClick={props.removeImage}
        />
      )}
      <span className="content-wrap">
        {props.fun.file_type === 'image' && (
          <Image image={fileUrl !== '' ? fileUrl : props.fun.file_url} />
        )}
        <span className="right-content">
          <span className="head" onClick={props.onClick} role="presentation">
            {' '}
            {props.fileName ? (
              props.fun.file_name
            ) : (
              <React.Fragment>
                <span className="capitalize">{props.fun.file_type}</span>
              </React.Fragment>
            )}
          </span>
          <span className="text">
            {props.fun.file_type} <span className="low-case">{t('common.file')}</span> -{' '}
            <span className="low-case">{props.fun.file_size}</span>
          </span>
        </span>
        {props.onClick && (
          <span
            className="links"
            onClick={props.onClick}
            role="presentation"
          >
            <FontAwesomeIcon icon={faDownload} />
            <LinkText className="download">{t('common.download')}</LinkText>
          </span>
        )}
        {
          props.processing ?
            <span
              className="links process-link"
              role="presentation"
            >
              <LinkText className="processing">{t('common.processing')}</LinkText>
            </span>
          : null
        }
      </span>
    </Li>
  );
};

FunList.propTypes = {
  editable: PropTypes.bool,
  close: PropTypes.bool,
  file: PropTypes.object,
  removeImage: PropTypes.func,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  fun: PropTypes.object,
  funDescription: PropTypes.string,
  editDesc: PropTypes.func,
  fileName: PropTypes.bool,
};

FunList.defaultProps = {
  close: false,
  onClick: () => {},
  removeImage: () => {},
  classes: {},
  file: '',
  fun: {},
  funDescription: '',
  editable: false,
  editDesc: () => {},
  fileName: false,
};
export default FunList;
