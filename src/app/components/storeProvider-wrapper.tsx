'use client';
import { Provider } from 'react-redux';

import store from '@/reduxStore';

export const StoreProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
