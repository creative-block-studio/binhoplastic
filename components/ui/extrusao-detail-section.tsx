import extrusionObject from '@/assets/images/process-extrusion-object-figma.webp';
import {
  ProcessDetailSection,
  defaultProcessAnnotationPaths,
  defaultProcessAnnotationRects,
} from '@/components/ui/process-detail-section';

export function ExtrusaoDetailSection() {
  return (
    <ProcessDetailSection
      backgroundColor="#20284c"
      objectWidth="56%"
      objectImage={extrusionObject}
      objectAlt="Perfis e tubos do processo de extrusão"
      eyebrow="aplicação:"
      title="EXTRUSÃO"
      description="Material fundido empurrado continuamente por uma matriz. A seção transversal é constante; a forma vem do die, o acabamento vem do resfriamento controlado."
      products={['Perfis de PVC', 'Tubos e mangueiras', 'Chapas plásticas']}
      chipTop="Estabilidade"
      chipBottom="Cor consistente"
      chipTopStyle={{ left: '47.01%', top: '11.19%' }}
      chipBottomStyle={{ left: '20.35%', top: '62.81%' }}
      codeCardColor="#fcce20"
      codeCardTextColor="#1a2d5a"
      ghostTitleColor="rgba(52, 57, 91, 0.82)"
      ghostTitleFontSize="clamp(64px, 6.9vw, 96px)"
      ctaHoverColor="#20284c"
      annotationPaths={defaultProcessAnnotationPaths}
      annotationRects={defaultProcessAnnotationRects}
    />
  );
}
