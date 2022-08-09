import {Dimensions} from 'react-native';

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
    tokens: {
      validity: '1d',
    },
  };
};
