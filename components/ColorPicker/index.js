import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import Dropdown from 'components/Dropdown';
import { pageColors } from 'src/services/pageDesign';
import Loader from 'components/Loader';
import {
  Layout,
  Li,
  HeadColor,
  LinkColor,
  BgColor,
  Text,
  DropSubHead,
} from './styled';

const ColorPicker = props => {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState(props.selected);
  const [colors, setColors] = useState(props.options || []);
  const [loader, setLoader] = useState(true);
  const colorChange = selected => {
    setSelectedColor(selected);
    props.onChange(selected);
  };

  useEffect(() => {
    const result = pageColors();
    result.then(resp => {
      if (resp.status === 'success') {
        setColors(resp.data);
        setLoader(false);
      }
    });
  }, []);

  const customSelection = selected => {
    return (
      <React.Fragment>
        <Text>
          <Trans i18nKey='common.colorPicker.colorTheme'>
            Color
            <br />
            Theme
          </Trans>
        </Text>
        <span className="color-wrpr">
          <HeadColor color={selected.accent} className="small-color" />
          <LinkColor color={selected.links} className="small-color" />
          <BgColor color={selected.background} className="small-color" />
        </span>
      </React.Fragment>
    );
  };
  const onDropListRender = (list, params, options) => {
    return (
      <React.Fragment>
        <DropSubHead>{t('common.colorPicker.selectTheme')}:</DropSubHead>
        {options.map(item => {
          return (
            <Li
              key={item.id}
              onClick={params.onClick({ label: item.id, value: item.id })}
              onKeyUp={params.onClick({ label: item.id, value: item.id })}
              className={`droplist-item ${
                selectedColor && selectedColor.id === item.id ? 'highlight' : ''
              }`}
            >
              <span className="color-wrpr">
                <HeadColor color={item.accent} className="list-color" />
                <LinkColor color={item.links} className="list-color" />
                <BgColor color={item.background} className="list-color" />
              </span>
            </Li>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Layout className={props.className}>
      <Dropdown
        rootClass="color-drop"
        options={[...props.default, ...colors] || []}
        selected={selectedColor}
        labelKey={props.labelKey}
        valueKey={props.valueKey}
        onChange={colorChange}
        customSelection={customSelection}
        listRender={onDropListRender}
        dropArrow={false}
        classes={{ list: 'color-drop-list' }}
        className="color-drop-inner"
      />
      {loader && <Loader class="loader-color" />}
    </Layout>
  );
};

ColorPicker.defaultProps = {
  options: [],
  selected: {},
  className: '',
  default: [],
};

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  selected: PropTypes.object,
  className: PropTypes.string,
  default: PropTypes.array,
};

export default ColorPicker;
