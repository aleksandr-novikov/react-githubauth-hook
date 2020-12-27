import { useCallback, useEffect, useMemo, useState } from 'react';
import { toParams, toUrlQuery } from './utils';

const windowId = 'github-auth-popup';

type GithubAuthProps = {
  windowOptions?: { [key: string]: string | number };
  onSuccess: (params: { [key: string]: string }) => void;
  onError: (e: Error) => void;
  scope: string;
  clientId: string;
  redirectUri: string;
};

export const useGithubAuth: (
  props: GithubAuthProps
) => readonly [() => void] = ({
  windowOptions = {},
  onSuccess,
  onError,
  clientId,
  redirectUri,
  scope,
}: GithubAuthProps) => {
  const [popup, setPopup] = useState<Window | null>(null);

  const urlParams = useMemo(
    () =>
      toUrlQuery({
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
      }),
    [clientId, scope, redirectUri]
  );

  const authUrl = `https://github.com/login/oauth/authorize?${urlParams}`;

  const open = useCallback(() => {
    const p = window.open(authUrl, windowId, toUrlQuery(windowOptions, ','));
    setPopup(p);
  }, [authUrl]);

  const close = useCallback(() => {
    if (popup && !popup.closed) popup.close();
    setPopup(null);
  }, [popup]);

  useEffect(() => {
    if (popup) {
      const intervalId = window.setInterval(() => {
        try {
          if (popup.closed) {
            close();
            onError(new Error('Popup was closed.'));
          }

          const popupHref = popup.location.href;

          if (popupHref !== 'about:blank' && popupHref !== authUrl) {
            const responseParams = toParams(
              popup.location.search.replace(/^\?/, '')
            );
            if (responseParams.error) {
              close();
              onError(new Error(responseParams.error_description));
            } else {
              setPopup(null);
              onSuccess(responseParams);
            }
          }
        } catch (e) {
          // Security Error
        }
      }, 500);

      return () => window.clearInterval(intervalId);
    }
  }, [popup]);

  return [() => open()] as const;
};
