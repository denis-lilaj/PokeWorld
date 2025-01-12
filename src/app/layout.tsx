import '@/styles/globals.css';

import { StoreProviderWrapper } from '@/app/components/storeProvider-wrapper';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Pokémon World',
  description: 'Explore the world of Pokémon with a modern web experience!',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body className='bg-amber-700'>
        <StoreProviderWrapper>{children}</StoreProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
