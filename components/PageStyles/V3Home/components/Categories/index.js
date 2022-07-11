import { useMediaQuery } from '@material-ui/core';
import React from 'react';
// import { useMedia } from '../../../../customHooks/domUtils'
import { CategoriesItem, CategoriesContainter } from './styled';
import Image from 'next/image';
import Link from 'next/link';
const CategoryList = (props) => {
	// const { categories } = props
	// const categories = [
	//   {
	//     title: 'Sports',
	//     slug: 'sport',
	//     bg: '',
	//     id: 1,
	//   }
	// ]
	const categories = [
		{
			id: 0,
			slug: 'browse-stars',
			title: 'View all'
		},
		{
			id: 1,
			slug: 'sports',
			title: 'sports'
		},
		{
			id: 2,
			slug: 'movies-tv',
			title: 'Movies/TV'
		},
		{
			id: 3,
			slug: 'music',
			title: 'Music'
		},
		{
			id: 4,
			slug: 'comedians',
			title: 'Comedy'
		},
		{
			id: 5,
			slug: 'social-youtube',
			title: 'Social'
		},
		{
			id: 6,
			slug: 'radio-podcast',
			title: 'Radio'
		},
	];
	const isMobile = useMediaQuery('(max-width: 831px)');
	function nextLine(text) {
		if (text.includes('/') && isMobile) {
			const array = text.split('/');
			return <p>{array[0]} /<br/> {array[1]} </p>;
		}
		return <p> {text} </p>;
	}
	return (
		<CategoriesContainter>
			<div className="categories">

				{
					categories.map((row, index) => !isMobile || (isMobile && index < categories.length - 1) ? (
						<Link href={row.slug.includes('browse-stars') ? '/browse-stars' : `/category/${row.slug}`} passHref prefetch={true}>

							<CategoriesItem key={row.id} bgImg={`/images/homepage-v3/${props.profImage[index]}`} href={row.slug.includes('browse-stars') ? '/browse-stars' : `/category/${row.slug}`}>
								<Image
									src="/images/homepage-v3/pink.png"
									alt="red"
									layout="fill"
									objectFit="cover"
									className="gradient"
								/>

								<Image
									src={`/images/homepage-v3/${props.profImage[index]}`}
									alt={'getStarName(row)'}
									layout="fill"
									objectFit="cover"
									className="img"
								/>
								{nextLine(row.title)}
							</CategoriesItem>
						</Link>
					) : null)
				}
			</div>
		</CategoriesContainter>
	);
};

export default CategoryList;
