import injectionObject from '@/assets/images/process-injection-object-figma.webp';
import {
  ProcessDetailSection,
  defaultProcessAnnotationPaths,
  defaultProcessAnnotationRects,
} from '@/components/ui/process-detail-section';

export function InjectionDetailSection() {
  return (
    <ProcessDetailSection
      backgroundColor="#20284c"
      objectImage={injectionObject}
      objectAlt="Peças plásticas do processo de injeção"
      eyebrow="aplicação:"
      title="INJEÇÃO"
      description="Polímero fundido injetado sob alta pressão em molde fechado. Resfriamento rápido garante precisão dimensional e repetitividade de detalhe fino, paredes complexas, texturas e encaixes saem idênticos a cada ciclo."
      products={[
        'Tampas de cosméticos',
        'Caixas organizadoras',
        'Peças automotivas',
      ]}
      chipTop="Alta dispersão"
      chipBottom="Cor consistente"
      codeCardColor="#bd3b5d"
      annotationPaths={defaultProcessAnnotationPaths}
      annotationRects={defaultProcessAnnotationRects}
    />
  );
}
