import React, { useMemo } from 'react';
import { generateUserSchema, generateProductSchema } from './services';
import Head from 'next/head'
import { isEmpty } from '../../../../../src/utils/dataStructures';
import { isBrowser } from '../../../../../customHooks/domUtils';

const SchemaGenerator = ({
  socialListData,
  digitalGoodsList,
  productsList,
  ...props
}) => {
  const userSchema = useMemo(() => {
    if (!isEmpty(socialListData)) {
      return generateUserSchema(props, socialListData.social_media_shout_out_title, digitalGoodsList);
    }
    return '';
  }, [isEmpty(socialListData), isEmpty(digitalGoodsList)])

  const productSchema = useMemo(() => {
    if (productsList?.length) {
      return generateProductSchema(props, productsList);
    }
    return [];
  }, [isEmpty(productsList)])

  return (
    <React.Fragment>
      <Head>
        <script type="application/ld+json">{userSchema}</script>
      </Head>
      {
        productSchema.map((prodSch, index) => (
          <Head key={index}>
            <script type="application/ld+json">{prodSch}</script>
          </Head>
        ))
      }
    </React.Fragment>
  )
}

export default SchemaGenerator
