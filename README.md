# react-githubauth-hook

React hook providing Github Authentication popup window.

## Installation
```
npm install react-githubauth-hook
```

## Requirements
React v^16.9.0

## Usage

### useGithubAuth
```tsx
import React from 'react';
import { useGithubAuth } from 'react-githubauth-hook';

const App = () => {
  const onError = (e: Error) => console.log('Github auth error: ', e);
  const onSuccess = (r: { [key: string]: string }) =>
    console.log('Github auth response: ', r);

  const [openGithubAuthPopup] = useGithubAuth({
    clientId: 'GITHUB_CLIENT_ID',
    redirectUri: 'http://redirect_uri', // Important: redirectUri should match this application domain
    scope: 'repo', // Github authentication scope
    windowOptions: { height: 800, width: 600 }, // Optional window settings
    onSuccess,
    onError,
  });

  return (
    <button onClick={() => openGithubAuthPopup()}>Login with Github</button>
  );
};

```

## License

Copyright (c) 2020 Aleksandr Novikov. MIT License.
