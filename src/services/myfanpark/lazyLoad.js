import { useEffect, useState } from "react";

export const StripeScriptLoader = ({
  children,
  uniqueId,
  script,
  loader = 'Loading...',
}) => {
  const [stripeLoaded, setStripeLoaded] = useState({})
  useEffect(() => {
    const loadScript = (src, uniqueId) =>
      new Promise((resolve, reject) => {
        const scriptElement = document.getElementById(uniqueId);

        if (!scriptElement) {
          const script = document.createElement('script');
          script.src = src;
          script.id = uniqueId;

          const handleLoadScriptSuccess = () => resolve({ successful: true });
          const handleLoadScriptFail = event => {
            script.remove();
            reject({ error: event })
          };

          script.addEventListener('load', handleLoadScriptSuccess, {
            once: true,
          });
          script.addEventListener('error', handleLoadScriptFail, { once: true });
          document.body.appendChild(script);
        } else {
          resolve({ successful: true });
        }
      })
    const fetchData = async () => {
      const result = await loadScript(script, uniqueId);
      setStripeLoaded(result);
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return stripeLoaded.successful ? children : loader
}
