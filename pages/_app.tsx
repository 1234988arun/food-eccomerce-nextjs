import { Food } from '@/context/FoodContext';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Food>
      <Component {...pageProps} />
    </Food>
  );
}
