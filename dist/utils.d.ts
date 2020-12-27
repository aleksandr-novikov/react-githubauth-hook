export declare const toParams: (query: string) => {
    [key: string]: string;
};
export declare const toUrlQuery: (params: {
    [key: string]: string | number | boolean;
}, delimiter?: string) => string;
