import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import DropdownStyled from './styled';
import { isEmpty } from '../../src/utils/dataStructures';
import { NotificationCount } from '../../styles/CommonStyled';
import Input from '../TextInput';
export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    const list = props.options
      ? props.options.map(option => ({
          label: option[props.labelKey],
          value: option[props.valueKey],
          count: option.count,
        }))
      : [];
    const selected = list.find(
      option => option.value === props.selected[props.valueKey],
    );
    this.state = {
      showDropList: props.defaultOpen,
      list,
      selected,
      search: '',
      error: false,
    };
    this.cursorPos = -1;
    this.optionList = React.createRef();
    this.selectRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.checkWindowClick);
    window.addEventListener('touchmove', this.checkWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.checkWindowClick);
    window.removeEventListener('touchmove', this.checkWindowClick);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { list, selected } = prevState;
    let options = JSON.parse(JSON.stringify(nextProps.options));
    if (prevState.search && nextProps.searchable) {
      const temp = options.filter(
        item =>
          item[nextProps.labelKey]
            .toLowerCase()
            .includes(prevState.search.toLowerCase()) ||
          item[nextProps.valueKey]
            .toLowerCase()
            .includes(prevState.search.toLowerCase()),
      );
      if (temp) {
        options = temp;
      }
    }
    list = options
      ? options.map(option => ({
          label: option[nextProps.labelKey],
          value: option[nextProps.valueKey],
          count: option.count,
        }))
      : [];
    selected = list.find(
      option => option.value === nextProps.selected[nextProps.valueKey],
    );
    return { list, selected };
  }
  
  toggleDropDown = state => () => {
    this.cursorPos = -1;
    let { search, selected } = this.state;
    if (state && selected) {
      search = selected.label;
    }
    this.setState({ showDropList: state, search });
  };

  checkWindowClick = e => {
    if (
      this.selectRef.current &&
      !this.selectRef.current.contains(e.target) &&
      this.optionList.current &&
      !this.optionList.current.contains(e.target)
    ) {
      this.toggleDropDown(false)();
    }
  };

  findActualOption = option => {
    const { options, labelKey } = this.props;
    return options.find(optionItem => optionItem[labelKey] === option.label);
  };

  selectOption = option => event => {
    if (event.nativeEvent.type === 'click') {
      this.setState({ selected: option, search: '', error: false });
      this.props.onChange(this.findActualOption(option));
      this.toggleDropDown(false)();
    } else if (event.nativeEvent.type === 'keyup' && event.keyCode === 13) {
      this.setState({ selected: option, search: '', error: false });
      this.props.onChange(this.findActualOption(option));
      this.toggleDropDown(false)();
    }
  };

  inputChange = event => {
    const {
      target: { value },
    } = event;
    this.setState({ search: value, showDropList: true, selected: {} }, () => {
      this.props.onChange({
        [this.props.labelKey]: '',
        [this.props.valueKey]: '',
      });
    });
  };

  searchBlurHandler = event => {
    const {
      target: { value },
    } = event;
    if (this.state.list && value && (!event.relatedTarget || !this.optionList.current || !this.optionList.current.contains(event.relatedTarget))) {
      const selected = this.state.list.find(
        option =>
          option.label.toLowerCase() === value.toLowerCase() ||
          option.value.toLowerCase() === value.toLowerCase(),
      );
      if (selected) {
        this.setState(
          { search: '', selected, error: false, showDropList: false },
          () => {
            this.props.onChange(this.findActualOption(selected));
          },
        );
      } else {
        this.setState({ error: true });
      }
    }
  };

  handleListKeyUp = event => {
    const { showDropList } = this.state;
    const { cursorPos } = this;
    const { options } = this.props;
    if (this.optionList && this.optionList.current) {
      let childNodes = [...this.optionList.current.childNodes];
      if (childNodes) {
        childNodes = childNodes.filter(node => {
          const classList = [...node.classList];
          return classList.indexOf('droplist-item') > -1;
        });
        if (event.key === 'ArrowUp' && showDropList && cursorPos - 1 >= 0) {
          childNodes[cursorPos - 1].focus();
          this.cursorPos = cursorPos - 1;
        } else if (
          event.key === 'ArrowDown' &&
          showDropList &&
          cursorPos + 1 < options.length
        ) {
          childNodes[cursorPos + 1].focus();
          this.cursorPos = cursorPos + 1;
        }
      }
    }
  };

  handleScrollbarsMount = node => {
    this.optionList.current = node && node.view;
  };

  renderDropList = () => {
    const { list, selected } = this.state;
    const { secondary, listRender, overflowRender } = this.props;
    return (
      <DropdownStyled.OptionsList
        className={this.props.classes.list}
        overflowRender={overflowRender}
        secondary={secondary}
      >
        <Scrollbars
          className={this.props.classes.scrollbar}
          autoHeight
          autoHeightMin={0}
          autoHeightMax={346}
          ref={this.handleScrollbarsMount}
          renderView={props => (
            <div {...props} className="drop-custom-scroll" />
          )}
          renderTrackVertical={props => (
            <div {...props} className="track-ver" />
          )}
        >
          {listRender
            ? listRender(
                list,
                {
                  onClick: this.selectOption,
                  onKeyUp: this.selectOption,
                  Component: DropdownStyled.Options,
                },
                this.props.options,
              )
            : list.map(item => (
                <DropdownStyled.Options
                  secondary={secondary}
                  tabIndex="0"
                  className={`droplist-item ${
                    selected && selected.label === item.label ? 'highlight' : ''
                  }`}
                  onClick={this.selectOption(item)}
                  onKeyUp={this.selectOption(item)}
                  key={item.value}
                >
                  {item.label}
                  {item.count && (
                    <NotificationCount className="count-li">
                      {item.count}
                    </NotificationCount>
                  )}
                </DropdownStyled.Options>
              ))}
        </Scrollbars>
      </DropdownStyled.OptionsList>
    );
  };

  render() {
    const { showDropList, selected } = this.state;
    const {
      placeHolder,
      secondary,
      rootClass,
      overflowRender,
      dropArrow,
      customSelection,
    } = this.props;
    return (
      <DropdownStyled className={`cus-drop ${rootClass}`}>
        <DropdownStyled.Select
          secondary={secondary}
          showList={showDropList}
          tabIndex="0"
          onKeyUp={this.handleListKeyUp}
          ref={this.selectRef}
          className={this.props.className && this.props.className}
        >
          {customSelection ? (
            <div
              onClick={this.toggleDropDown(!showDropList)}
              role="presentation"
              className="custom-selection"
            >
              {!isEmpty(selected) &&
                customSelection(this.findActualOption(selected))}
            </div>
          ) : (
            <React.Fragment>
              {this.props.searchable ? (
                <Input
                  inputProps={{
                    nativeProps: this.props.nativeProps,
                    defaultProps: {
                      value: (selected && selected.label) || this.state.search,
                      onInput: this.inputChange,
                      onBlur: this.searchBlurHandler,
                      onClick: this.toggleDropDown(!showDropList),
                      error: this.props.inputError,
                    },
                    labelObj: {
                      label: this.props.label,
                    },
                  }}
                />
              ) : (
                <DropdownStyled.CurrentSelected
                  onClick={this.toggleDropDown(!showDropList)}
                  className="customPlaceholder"
                >
                  {(selected && selected.label) || placeHolder || 'Select'}
                  {selected && selected.count && (
                    <NotificationCount className="n-count">
                      {selected.count}
                    </NotificationCount>
                  )}
                </DropdownStyled.CurrentSelected>
              )}
            </React.Fragment>
          )}
          {dropArrow && (
            <DropdownStyled.DropIcon
              className="drop-icon"
              onClick={this.toggleDropDown(!showDropList)}
            />
          )}
          {showDropList && !overflowRender && this.renderDropList()}
        </DropdownStyled.Select>
        {this.state.error && this.props.errorMsg && (
          <span className="error-msg">{this.props.errorMsg}</span>
        )}
        {showDropList && overflowRender && this.renderDropList()}
      </DropdownStyled>
    );
  }
}

Dropdown.defaultProps = {
  placeHolder: 'common.select',
  className: '',
  rootClass: 'drop-down',
  listRender: false,
  secondary: false,
  defaultOpen: false,
  selected: {},
  classes: {},
  searchable: false,
  placeholder: '',
  nativeProps: {},
  errorMsg: '',
  dropArrow: true,
  customSelection: null,
  overflowRender: false,
  inputError: false,
  label: '',
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  listRender: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  rootClass: PropTypes.string,
  classes: PropTypes.object,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string,
  nativeProps: PropTypes.object,
  errorMsg: PropTypes.string,
  dropArrow: PropTypes.bool,
  customSelection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  overflowRender: PropTypes.bool,
  inputError: PropTypes.bool,
  label: PropTypes.string,
};
