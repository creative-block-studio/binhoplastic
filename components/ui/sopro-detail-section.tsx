import blowObject from '@/assets/images/process-blow-object-figma.webp';
import {
  ProcessDetailSection,
  defaultProcessAnnotationPaths,
  defaultProcessAnnotationRects,
} from '@/components/ui/process-detail-section';

export function SoproDetailSection() {
  return (
    <ProcessDetailSection
      backgroundColor="#8f1238"
      objectWidth="50%"
      objectImage={blowObject}
      objectAlt="Frascos e galões do processo de sopro"
      eyebrow="aplicação:"
      title="SOPRO"
      description="Parison inflado dentro do molde com expansão biaxial. No PET, o estiramento define resistência e clareza da parede. Alta produtividade, foco total em embalagem."
      products={['Garrafas PET', 'Frascos de shampoo', 'Galões industriais']}
      chipTop="Cor que aguenta o estiramento"
      chipBottom="Cor consistente"
      codeCardColor="#62c3d1"
      codeCardTextColor="#1a2d5a"
      ghostTitleColor="rgba(112, 12, 43, 0.66)"
      ctaHoverColor="#8f1238"
      annotationPaths={defaultProcessAnnotationPaths}
      annotationRects={defaultProcessAnnotationRects}
    />
  );
}
