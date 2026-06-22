import type { Metadata } from 'next';

import { ColorCatalogPage } from '@/components/ui/color-catalog-page';

export const metadata: Metadata = {
  title: 'Catálogo de cores | Binho Plastic',
  description:
    'Explore o catálogo visual de cores da Binho Plastic por processo e compatibilidade de resina.',
};

export default function CatalogoPage() {
  return <ColorCatalogPage />;
}
