import { isBrowser } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';
import { locStorage } from 'src/utils/localStorageUtils';
import { useGeneral } from '../../src/context/general';

/**
 *
 * @param {*} conversionRate for custom conversion rate
 * @returns getLocalSymbol, getLocalAmount, getUsdAmount
 */
export const useGetLocalAmount = (conversionRate = null) => {
	const [state] = useGeneral();
	const storageCurrencyData = isBrowser() ? locStorage.getItem('currencyData') : null;
	const router = useRouter();

	// If it gets to this point, we already have the partner data, so no need to refetch.
	const { data } = useGetPartner();
	const currencyData =  data?.currencyData || state.currencyData || storageCurrencyData;
	const getUSDAmount = localValue => {
		let conv;
		if (conversionRate) {
			conv = conversionRate;
		} else if (currencyData?.rate) {
			conv = parseFloat(currencyData.rate);
		} else {
			conv = 1;
		}
		return Number(localValue)*(1/conv) || 0;
	};
	const getLocalAmount = usdValue => {
		let conv;
		if (conversionRate) {
			conv = conversionRate;
		} else if (currencyData?.rate) {
			conv = parseFloat(currencyData.rate);
		} else {
			conv = 1;
		}
		return usdValue*conv || 0;};

	const getLocalSymbol = () => currencyData?.symbol || '$';
	return [ getLocalSymbol, getLocalAmount, getUSDAmount];};


export const useCurrencyData = () => {
	const [state] = useGeneral();
	const storage = isBrowser() ? locStorage.getItem('currencyData') : null;
	const { data } = useGetPartner();
	return data?.currencyData || storage || state?.currencyData ;
};
