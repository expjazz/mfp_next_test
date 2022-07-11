import { searchableProfession } from '../../constants/algolia-entities';
import algoliasearch from 'algoliasearch';
import { accountStatus } from '../../constants/stars/accountStatus';

export const algoliaQueryPerIndex = async (entIndex) => {
	const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_ID, process.env.NEXT_PUBLIC_ALGOLIA_TOKEN);
	const index = client.initIndex(entIndex);
	const data = await index.search('', {
		filters: 'talent_status:live OR talent_status:paused',
		hitsPerPage: 10
	});
	// const data = await index.search('');

	return data.hits;
};

export const algoliaGeneralSearch = (searchParam, entityData) => {
	const { entity_id: entityId, algolia_index: algoliaIndex } = entityData;
	const entity = entityId === 'SUPERSPORT-ZA-1' ? 'MYFANPARK-ZA-1' : entityId;
	const regionShare = entityId !== 'SUPERSPORT-ZA-1';
	const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_ID, process.env.NEXT_PUBLIC_ALGOLIA_TOKEN);
	const celebParams = {
		hitsPerPage: 10,
	};
	if (!regionShare) {
		celebParams.filters += `readable_entity_name:${entity} AND`;
	}
	if (entityId === 'SUPERSPORT-ZA-1') {
		celebParams.filters += ' AND professions:1';
	}
	const queries = [{
		indexName: process.env.NEXT_PUBLIC_SEARCH_PROFESSION_INDEX,
		query: searchParam,
		restrictSearchableAttributes: [searchableProfession[entity]],
		params: {
			hitsPerPage: 10,
		}
	}, {
		indexName: process.env.NEXT_PUBLIC_SEARCH_TAG_INDEX,
		query: searchParam,
		params: {
			hitsPerPage: 10,
			facetFilters: `tag_entities:${entity}`,
			filters: 'is_available:true'
		}
	}, {
		indexName: algoliaIndex,
		query: searchParam,
		params: {
			...celebParams
		}
	}];

	return client.multipleQueries(queries).then(({results}) => {
		let professions = [];
		let tags = [];
		let stars = [];
		// This is hardcoded for dev. Will update as soon as it is fully working to be adapt to the env
		results.forEach(row => {
			switch(row.index) {
			case process.env.NEXT_PUBLIC_SEARCH_PROFESSION_INDEX:
				professions = row.hits.map(subRow => ({ ...subRow, search_type: 'profession' }));
				break;
			case process.env.NEXT_PUBLIC_SEARCH_TAG_INDEX:
				tags = row.hits.map(subRow => ({ ...subRow, tag_name: subRow.name, tag_slug: subRow.slug ,search_type: 'tag' }));
				break;
			case algoliaIndex:
				stars = row.hits.filter(subRow => subRow.talent_status === accountStatus.live || subRow.talent_status === accountStatus.paused).map(subRow => ({ ...subRow, professions: JSON.
					stringify(subRow.celebrity_profession.map(x => x.title)), tags: JSON.
					stringify(subRow.tags.map(x => x.name)), ...subRow.avatar_photo, vanity_id: subRow.vanity_url, search_type: '' }) );
				break;
			default:
				break;
			}
		});
		return { stars, professions, tags };
	});
};