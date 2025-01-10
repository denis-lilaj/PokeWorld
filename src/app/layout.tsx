import '@/styles/globals.css';
import '@/styles/colors.css';
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
      <body className='bg-amber-700'>{children}</body>
    </html>
  );
};

export default RootLayout;
