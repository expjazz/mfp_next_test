import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import Dropdown from 'components/Dropdown';
import { pageFonts } from 'src/services/pageDesign';
// import { loadCss } from 'src/utils/domUtils';
import Loader from 'components/Loader';
import { Layout, Li, Text, DropSubHead, Font } from './styled';
import { loadCss } from 'customHooks/domUtils';

const FontPicker = props => {
  const { t } = useTranslation();
  const [selectedFont, setSelectedFont] = useState(props.selected);
  const [fonts, setFonts] = useState(props.options || []);
  const [loader, setLoader] = useState(true);
  const fontChange = selected => {
    setSelectedFont(selected);
    props.onChange(selected);
  };

  const loadCssFiles = fontList => {
    fontList.forEach(font => {
      loadCss(font.font, font.font_url);
    });
  };

  useEffect(() => {
    const result = pageFonts();
    result.then(resp => {
      if (resp.status === 'success') {
        loadCssFiles(resp.data);
        setFonts(resp.data);
        setLoader(false);
      }
    });
  }, []);

  const customSelection = selected => {
    return (
      <React.Fragment>
        <Text>
          <Trans i18nKey="common.fontPicker.fontChoice">
            Font
            <br />
            Choice
          </Trans>
        </Text>
        <Font fontFamily={selected.font} className="font-text">
          {props.label}
        </Font>
      </React.Fragment>
    );
  };
  const onDropListRender = (list, params, options) => {
    return (
      <React.Fragment>
        <DropSubHead>{t('common.fontPicker.fontSelect')}:</DropSubHead>
        {options.map(item => {
          return (
            <Li
              key={item.id}
              onClick={params.onClick({ label: item.id, value: item.id })}
              onKeyUp={params.onClick({ label: item.id, value: item.id })}
              className={`droplist-item ${
                selectedFont && selectedFont.id === item.id ? 'highlight' : ''
              }`}
            >
              <Font fontFamily={item.font} className="list-font">
                {props.label}
              </Font>
            </Li>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Layout className={props.className}>
      <Dropdown
        rootClass="font-drop"
        options={[...props.default, ...fonts] || []}
        selected={selectedFont}
        labelKey={props.labelKey}
        valueKey={props.valueKey}
        onChange={fontChange}
        customSelection={customSelection}
        listRender={onDropListRender}
        dropArrow={false}
        classes={{ list: 'font-drop-list' }}
        className="font-drop-inner"
      />
      {loader && <Loader class="loader-font" />}
    </Layout>
  );
};

FontPicker.defaultProps = {
  options: [],
  selected: {},
  className: '',
  label: '',
  default: [],
};

FontPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  selected: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  default: PropTypes.array,
};

export default FontPicker;
