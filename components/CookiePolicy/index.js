import React, { useState } from 'react';
import Button from 'components/SecondaryButton';
import { useTranslation, Trans } from 'next-i18next';
import { Wrapper } from './styled';
import { locStorage } from 'src/utils/localStorageUtils';
import { isWebView } from 'customHooks/domUtils';
import { useRouter } from 'next/router';

function CookiePolicy() {
	const { t } = useTranslation();
	const [enabled, setEnabled] = useState(false);
	const router = useRouter();
	// Per PM-3502 Not show cookie policy if it's being rendered from react-native
	if (isWebView()) return null;
	if (enabled) return null;
	if (router.asPath.includes('/external')) return null;
	return (
		<Wrapper>
			<div className="content">
				<p>
					<Trans i18nKey="common.cookie_policy">
            This website uses cookies in order to offer you to the most relevant
            information. Please accept cookies for optimal performance.
						<a
							href="https://myfanpark.com/privacy-policy"
							target="_blank"
							rel="noreferrer"
						>
              Learn more
						</a>
					</Trans>
				</p>
				<Button
					className="book-btn"
					secondary
					onClick={() => {
						setEnabled(true);
						locStorage.setItem('cookieEnabled', true);
					}}
				>
					{t('common.gotit')}
				</Button>
			</div>
		</Wrapper>
	);
}

CookiePolicy.propTypes = {};

export default CookiePolicy;
