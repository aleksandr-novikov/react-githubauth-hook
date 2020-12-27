declare type GithubAuthProps = {
    windowOptions?: {
        [key: string]: string | number;
    };
    onSuccess: (params: {
        [key: string]: string;
    }) => void;
    onError: (e: Error) => void;
    scope: string;
    clientId: string;
    redirectUri: string;
};
export declare const useGithubAuth: (props: GithubAuthProps) => readonly [() => void];
export {};
