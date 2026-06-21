import type { Metadata } from 'next';

import { RequestSamplePage } from '@/components/ui/request-sample-page';

export const metadata: Metadata = {
  title: 'Solicitar amostra | Binho Plastic',
  description:
    'Entre em contato com a Binho Plastic para solicitar amostras, suporte técnico e orientação para o seu processo.',
};

export default function SolicitarAmostraPage() {
  return <RequestSamplePage />;
}
