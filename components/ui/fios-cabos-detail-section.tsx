import wiresObject from '@/assets/images/process-wires-object-figma.png';
import {
  ProcessDetailSection,
  defaultProcessAnnotationRects,
} from '@/components/ui/process-detail-section';

const fiosCabosAnnotationPaths = [
  { d: 'M111 141H392L529 238', delay: 0.48 },
  { d: 'M732 129L774 182', delay: 0.84 },
  { d: 'M902 228L1129 169H1333', delay: 1.24 },
  { d: 'M458 524L556 428', delay: 0.96 },
  { d: 'M789 499L976 626H1328', delay: 1.58 },
] as const;

export function FiosCabosDetailSection() {
  return (
    <ProcessDetailSection
      backgroundColor="#20284c"
      objectWidth="45.5%"
      objectImage={wiresObject}
      objectAlt="Cabos elétricos coloridos do processo de fios e cabos"
      eyebrow="aplicação:"
      title="FIOS E CABOS"
      description="Extrusão contínua de polímero sobre condutor metálico. O revestimento é o isolante, qualquer falha de processo é uma falha de segurança."
      products={[
        'Cabos elétricos residenciais',
        'Cabos automotivos',
        'Cabos de dados',
      ]}
      chipTop="NORMA TÉCNICA"
      chipBottom="Cor consistente"
      chipTopStyle={{ left: '47.01%', top: '11.19%' }}
      codeCards={[
        { background: '#e32168' },
        { background: '#62c3d1', textColor: '#1a2d5a' },
        { background: '#fcce20', textColor: '#1a2d5a' },
      ]}
      codeCardColor="#e32168"
      codeCardSize="compact"
      codeCardContainerStyle={{ right: '7.8%', bottom: '24.1%' }}
      ghostTitleColor="rgba(52, 57, 91, 0.82)"
      ghostTitleFontSize="clamp(50px, 5.2vw, 70px)"
      ctaHoverColor="#20284c"
      annotationPaths={fiosCabosAnnotationPaths}
      annotationRects={defaultProcessAnnotationRects}
    />
  );
}
