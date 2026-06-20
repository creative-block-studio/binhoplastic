import filmObject from '@/assets/images/process-film-object-figma.webp';
import {
  ProcessDetailSection,
  defaultProcessAnnotationRects,
} from '@/components/ui/process-detail-section';

const filmAnnotationPaths = [
  { d: 'M111 141H392L529 238', delay: 0.48 },
  { d: 'M732 129L774 182', delay: 0.84 },
  { d: 'M902 228L1129 169H1333', delay: 1.24 },
  { d: 'M410 586L556 428', delay: 0.96 },
  { d: 'M789 499L1080 614H1328', delay: 1.58 },
] as const;

export function FilmeDetailSection() {
  return (
    <ProcessDetailSection
      backgroundColor="#f7c31b"
      objectWidth="47%"
      objectImage={filmObject}
      objectAlt="Embalagens flexíveis do processo filme"
      foregroundColor="#1a2d5a"
      eyebrowColor="#1a2d5a"
      titleColor="#1a2d5a"
      bodyColor="#1a2d5a"
      productsColor="#1a2d5a"
      productsTitleColor="#1a2d5a"
      annotationColor="#1a2d5a"
      annotationRectColor="#1a2d5a"
      arrowColor="#1a2d5a"
      eyebrow="aplicação:"
      title="FILME"
      description="Extrusão por sopro (blown film) ou casting. O filme é orientado molecularmente em espessuras muito baixas, mono ou multicamada conforme a aplicação."
      products={['Sacolas', 'Filme stretch', 'Embalagens flexíveis de alimento']}
      chipTop="Baixa Espessura"
      chipBottom="Cor consistente"
      chipTopStyle={{
        left: '47.01%',
        top: '11.19%',
        background: 'rgba(26, 45, 90, 0.18)',
        color: '#1a2d5a',
      }}
      chipBottomStyle={{
        left: '16.88%',
        top: '71.14%',
        background: '#c4a225',
        color: '#1a2d5a',
      }}
      codeCardColor="#e32168"
      ghostTitleColor="rgba(224, 162, 47, 0.6)"
      ctaColor="#1a2d5a"
      ctaBorderColor="rgba(26, 45, 90, 0.38)"
      ctaFillColor="#1a2d5a"
      ctaHoverColor="#f7c31b"
      annotationPaths={filmAnnotationPaths}
      annotationRects={defaultProcessAnnotationRects}
    />
  );
}
