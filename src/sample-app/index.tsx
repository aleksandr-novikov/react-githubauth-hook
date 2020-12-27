import React from 'react';
import ReactDom from 'react-dom';
import { useGithubAuth } from '../index';

const SampleApp = () => {
  const onError = (e: Error) => console.log('Github auth error: ', e);
  const onSuccess = (r: { [key: string]: string }) =>
    console.log('Github auth response: ', r);

  const [openGithubAuthPopup] = useGithubAuth({
    clientId: 'GITHUB_CLIENT_ID',
    redirectUri: 'http://redirect_uri',
    scope: 'repo', // Github authentication scope
    windowOptions: { height: 800, width: 600 }, // Optional window settings
    onSuccess,
    onError,
  });

  return (
    <button onClick={() => openGithubAuthPopup()}>Login with Github</button>
  );
};

const node = document.getElementById('main');

ReactDom.render(<SampleApp />, node);
