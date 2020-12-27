export const toParams = (query: string): { [key: string]: string } => {
  const q = query.replace(/^\??\//, '');

  return q
    .split('&')
    .reduce((acc: { [key: string]: string }, param: string) => {
      const [key, value] = param.split('=');

      acc[key] = value;

      return acc;
    }, {});
};

export const toUrlQuery = (
  params: { [key: string]: string | number | boolean },
  delimiter = '&'
): string => {
  const keys = Object.keys(params);

  return keys.reduce((acc, key, index) => {
    let query = `${acc}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
};
