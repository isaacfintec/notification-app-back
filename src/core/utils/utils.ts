export const isProductionEnvironment = (): boolean => {
  const { ENV } = process.env;
  return ENV === 'production';
};

export const isDevelopmentEnvironment = (): boolean => {
  const { ENV } = process.env;
  return ENV === 'development';
};

export const isTestEnvironment = (): boolean => {
  const { NODE_ENV } = process.env;
  return NODE_ENV === 'test';
};
