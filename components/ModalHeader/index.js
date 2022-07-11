import React from 'react';
import PropTypes from 'prop-types';
// import BackHeader from 'components/BackHeader';
// import { FlexCenter } from 'styles/CommonStyled';
// import { Heading } from 'styles/TextStyled';
import { HeaderDiv, Image } from './styled';
import BackHeader from '../BackHeader';
import { FlexCenter } from '../../styles/CommonStyled';
import { Heading } from '../../styles/TextStyled';

const Header = props => {
  return (
    <React.Fragment>
      <HeaderDiv
        className={`headerGlobal ${props.class} ${
          props.classes ? props.classes.root : ''
        }`}
        isBack={props.arrowVisible}
      >
        <FlexCenter>
          <BackHeader
            backHandler={props.arrowVisible ? props.backArrowHandler : null}
            closeHandler={props.closeHandler}
          />

          <Image>
            <img
              src={props.starImage || 'images/profile.png'}
              alt="profile_icon"
            />
          </Image>
        </FlexCenter>
      </HeaderDiv>
      <Heading className="heading-bkng">{props.header}</Heading>
    </React.Fragment>
  );
};

Header.propTypes = {
  arrowVisible: PropTypes.bool,
  backArrowHandler: PropTypes.func,
  closeHandler: PropTypes.func,
  starImage: PropTypes.string,
  class: PropTypes.string,
  classes: PropTypes.object,
  header: PropTypes.string,
};
Header.defaultProps = {
  arrowVisible: false,
  starImage: '',
  class: '',
  backArrowHandler: null,
  classes: {},
  closeHandler: null,
  header: '',
};

export default Header;
