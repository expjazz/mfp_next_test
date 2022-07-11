import React from 'react';
import PageTitleStyled from './styled';

const PageTitle = props => (
	<PageTitleStyled>
		<PageTitleStyled.Title>{props.children || props.title}</PageTitleStyled.Title>
	</PageTitleStyled>
);

export default PageTitle;