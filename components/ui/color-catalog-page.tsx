'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  Construction,
  Download,
  Droplets,
  Filter,
  FlaskConical,
  Percent,
  ShieldAlert,
  ShieldCheck,
  SunMedium,
  Thermometer,
} from 'lucide-react';

import catalogHeroHeader from '@/assets/images/catalogo-hero-header.webp';
import { FlowButton } from '@/components/ui/flow-button';
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import styles from '@/components/ui/color-catalog-page.module.css';

type ProcessKey =
  | 'todos'
  | 'injecao'
  | 'extrusao'
  | 'sopro'
  | 'rotomoldagem'
  | 'filme'
  | 'fios-cabos';

type SpecIcon = 'temperature' | 'sun' | 'migration' | 'pigment' | 'percent' | 'shield';

type SpecItem = {
  label: string;
  value: string;
  description: string;
  icon: SpecIcon;
};

type CatalogColor = {
  id: string;
  code: string;
  name: string;
  swatch: string;
  processes: Exclude<ProcessKey, 'todos'>[];
  polymers: string[];
  heavyMetalsFree: boolean;
  technicalSpecs: SpecItem[];
  applications: SpecItem[];
  responsible: {
    name: string;
    role: string;
  };
};

const processLabels: Record<ProcessKey, string> = {
  todos: 'Todos',
  injecao: 'Injeção',
  extrusao: 'Extrusão',
  sopro: 'Sopro',
  rotomoldagem: 'Rotomoldagem',
  filme: 'Filme',
  'fios-cabos': 'Fios & Cabos',
};

const processKeys = Object.keys(processLabels) as ProcessKey[];

const processShortLabels: Record<Exclude<ProcessKey, 'todos'>, string> = {
  injecao: 'INJ',
  extrusao: 'EXT',
  sopro: 'SOP',
  rotomoldagem: 'ROT',
  filme: 'FILM',
  'fios-cabos': 'FIO',
};

const catalogColors: CatalogColor[] = [
  {
    id: 'b015109',
    code: 'B015109',
    name: 'MB Branco',
    swatch: '#FFFFFF',
    processes: ['injecao', 'extrusao', 'sopro', 'rotomoldagem', 'filme', 'fios-cabos'],
    polymers: ['PP', 'PE', 'PET', 'ABS', 'PS', 'PVC'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '280 C',
        description: 'Temperatura máxima de processamento',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '8/8',
        description: 'Escala máxima de resistência UV',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '8/8',
        description: 'Estabilidade cromática em contato',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '60 +- 10%',
        description: 'Concentrado em polímeros compatíveis',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '2,0%',
        description: 'Faixa média recomendada de aplicação',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Aprovado para brinquedos, alimentício e farma',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, PET, ABS, PS, PVC',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Injeção, Extrusão, Sopro, Filme',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b015110',
    code: 'B015110',
    name: 'MB Preto',
    swatch: '#111111',
    processes: ['injecao', 'extrusao', 'sopro', 'rotomoldagem', 'filme', 'fios-cabos'],
    polymers: ['PP', 'PE', 'PET', 'ABS', 'PS', 'PVC'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '280 C',
        description: 'Temperatura máxima de processamento',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '8/8',
        description: 'Excelente estabilidade sob exposição UV',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '8/8',
        description: 'Baixa transferência para outras superfícies',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '55 +- 10%',
        description: 'Fórmula balanceada para cobertura intensa',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '1,8%',
        description: 'Rendimento ajustado para cobertura opaca',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Apto para linhas com requisitos mais restritivos',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, PET, ABS, PS, PVC',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Injeção, Extrusão, Sopro, Filme',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b008831',
    code: 'B008831',
    name: 'Rosa Pink',
    swatch: '#E32168',
    processes: ['injecao', 'extrusao'],
    polymers: ['PP', 'PE', 'PET', 'ABS'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '280 C',
        description: 'Temperatura máxima de processamento',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '8/8',
        description: 'Escala de 1 a 8, máxima resistência UV',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '8/8',
        description: 'Baixo risco de transferência de cor',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '60 +- 10%',
        description: 'Concentrado em polímeros compatíveis',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '2,0%',
        description: 'Porcentagem média de aplicação',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Aprovado para linhas farmacêuticas, alimentícias e brinquedos',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, PET, ABS',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Injeção, Extrusão',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b001042',
    code: 'B001042',
    name: 'Vermelho Carmim',
    swatch: '#C92B37',
    processes: ['injecao', 'extrusao'],
    polymers: ['PP', 'PE', 'PET', 'ABS'],
    heavyMetalsFree: false,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '250 C',
        description: 'Processamento indicado para ciclos controlados',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '7/8',
        description: 'Boa resistência UV em aplicações internas e externas moderadas',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '6/8',
        description: 'Recomendado validar em peças com contato constante',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '52 +- 10%',
        description: 'Fórmula com reforço de cobertura',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '2,3%',
        description: 'Aplicação média para saturação alta',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Contém',
        description: 'Requer validação para segmentos regulados',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, PET, ABS',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Injeção, Extrusão',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b002156',
    code: 'B002156',
    name: 'Laranja Cítrico',
    swatch: '#F47D20',
    processes: ['extrusao', 'sopro'],
    polymers: ['PE', 'PP', 'PVC'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '260 C',
        description: 'Boa estabilidade para linhas de extrusão e sopro',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '7/8',
        description: 'Boa leitura cromática em exposição indireta',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '7/8',
        description: 'Estabilidade satisfatória em embalagens e frascos',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '58 +- 10%',
        description: 'Carga forte para cor viva e uniforme',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '1,9%',
        description: 'Aplicação média com boa relação custo-rendimento',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Aprovado para linhas com demanda atóxica',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PE, PP, PVC',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Extrusão, Sopro',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b003421',
    code: 'B003421',
    name: 'Amarelo Ouro',
    swatch: '#FCCE20',
    processes: ['extrusao', 'filme'],
    polymers: ['PP', 'PE', 'ABS', 'PS'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '255 C',
        description: 'Faixa segura para linhas médias e filmes técnicos',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '7/8',
        description: 'Boa permanência visual em exposição moderada',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '7/8',
        description: 'Controle de transferência em filmes e extrudados',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '57 +- 10%',
        description: 'Cobertura equilibrada para tons claros',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '2,1%',
        description: 'Aplicação média com foco em saturação uniforme',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Indicado para linhas com exigência de baixa toxicidade',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, ABS, PS',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Extrusão, Filme',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b005672',
    code: 'B005672',
    name: 'Verde Bandeira',
    swatch: '#1A5C38',
    processes: ['extrusao'],
    polymers: ['PP', 'PE', 'PET'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '265 C',
        description: 'Boa estabilidade para ciclos longos',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '8/8',
        description: 'Excelente resistência UV para peças externas',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '7/8',
        description: 'Baixa variação cromática após moldagem',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '56 +- 10%',
        description: 'Pigmentação equilibrada para cobertura uniforme',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '2,0%',
        description: 'Uso médio para tons estáveis e consistentes',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Seguro para aplicações sensíveis quando validado em linha',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, PET',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Extrusão',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b006891',
    code: 'B006891',
    name: 'Azul Marinho',
    swatch: '#1B2F6E',
    processes: ['injecao', 'extrusao'],
    polymers: ['PP', 'PE', 'ABS', 'PS'],
    heavyMetalsFree: true,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '255 C',
        description: 'Boa estabilidade para ciclos médios e curtos',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '8/8',
        description: 'Ótima permanência visual sob exposição UV',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '7/8',
        description: 'Baixa transferência para superfícies adjacentes',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '54 +- 10%',
        description: 'Carga pensada para cobertura profunda',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '1,9%',
        description: 'Faixa média indicada para tom fechado',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Isento',
        description: 'Apto para linhas com requisitos mais restritivos',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PP, PE, ABS, PS',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Injeção, Extrusão',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
  {
    id: 'b007234',
    code: 'B007234',
    name: 'Azul Piscina',
    swatch: '#62C3D1',
    processes: ['sopro', 'filme'],
    polymers: ['PE', 'PP', 'LDPE'],
    heavyMetalsFree: false,
    technicalSpecs: [
      {
        label: 'Resistência térmica máxima',
        value: '245 C',
        description: 'Temperatura controlada para preservar saturação',
        icon: 'temperature',
      },
      {
        label: 'Solidez à luz',
        value: '6/8',
        description: 'Bom desempenho para uso interno e externo moderado',
        icon: 'sun',
      },
      {
        label: 'Solidez à migração',
        value: '6/8',
        description: 'Recomendado validar em filmes de contato intenso',
        icon: 'migration',
      },
      {
        label: 'Teor de pigmentos',
        value: '49 +- 10%',
        description: 'Fórmula mais aberta para tons transluzentes',
        icon: 'pigment',
      },
    ],
    applications: [
      {
        label: 'Concentração de uso',
        value: '1,6%',
        description: 'Aplicação leve para manter transparência controlada',
        icon: 'percent',
      },
      {
        label: 'Metais pesados',
        value: 'Contém',
        description: 'Requer checagem em projetos regulados',
        icon: 'shield',
      },
      {
        label: 'Polímeros compatíveis',
        value: 'PE, PP, LDPE',
        description: '',
        icon: 'pigment',
      },
      {
        label: 'Processos compatíveis',
        value: 'Sopro, Filme',
        description: '',
        icon: 'migration',
      },
    ],
    responsible: {
      name: 'Everildo Carlos dos Santos Ribeiro',
      role: 'Químico Responsável · CRQ 084-943',
    },
  },
];

const catalogColorById = new Map(catalogColors.map((color) => [color.id, color]));

function formatSpecValue(value: string, icon: SpecIcon) {
  if (icon === 'temperature') {
    return value.replace(/(\d+)\s*C/g, '$1°C');
  }

  return value;
}

function getSpecIcon(icon: SpecIcon) {
  switch (icon) {
    case 'temperature':
      return <Thermometer size={18} strokeWidth={1.8} />;
    case 'sun':
      return <SunMedium size={18} strokeWidth={1.8} />;
    case 'migration':
      return <Droplets size={18} strokeWidth={1.8} />;
    case 'pigment':
      return <FlaskConical size={18} strokeWidth={1.8} />;
    case 'percent':
      return <Percent size={18} strokeWidth={1.8} />;
    case 'shield':
      return <ShieldCheck size={18} strokeWidth={1.8} />;
  }
}

function getReadableColor(hex: string) {
  const clean = hex.replace('#', '');
  const red = Number.parseInt(clean.slice(0, 2), 16);
  const green = Number.parseInt(clean.slice(2, 4), 16);
  const blue = Number.parseInt(clean.slice(4, 6), 16);

  const toLinear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const backgroundLuminance =
    0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

  const contrastWith = (foregroundHex: string) => {
    const foreground = foregroundHex.replace('#', '');
    const foregroundRed = Number.parseInt(foreground.slice(0, 2), 16);
    const foregroundGreen = Number.parseInt(foreground.slice(2, 4), 16);
    const foregroundBlue = Number.parseInt(foreground.slice(4, 6), 16);

    const foregroundLuminance =
      0.2126 * toLinear(foregroundRed) +
      0.7152 * toLinear(foregroundGreen) +
      0.0722 * toLinear(foregroundBlue);

    const lighter = Math.max(backgroundLuminance, foregroundLuminance);
    const darker = Math.min(backgroundLuminance, foregroundLuminance);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const darkText = '#111110';
  const lightText = '#F7F2EA';

  return contrastWith(darkText) >= contrastWith(lightText) ? darkText : lightText;
}

export function ColorCatalogPage() {
  const [activeProcess, setActiveProcess] = useState<ProcessKey>('todos');
  const [selectedColorId, setSelectedColorId] = useState('b008831');

  const filteredColors =
    activeProcess === 'todos'
      ? catalogColors
      : catalogColors.filter((color) => color.processes.includes(activeProcess));

  const selectedColor = catalogColorById.get(selectedColorId) ?? catalogColors[0];

  return (
    <>
      <SiteHeader />
      <main id="inicio" className={styles.page}>
        <section className={styles.hero} data-nav-tone="dark">
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              src={catalogHeroHeader}
              alt=""
              fill
              className={styles.heroBackgroundImage}
              sizes="100vw"
              priority
            />
          </div>
          <div className={styles.heroBackdrop} aria-hidden="true" />

          <div className="site-shell">
            <div className={styles.heroInner}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>Catálogo de Cores</span>
                <h1 className={styles.title}>Encontre a cor certa para o seu processo</h1>
                <p className={styles.description}>
                  Filtre por processo e resina para ver as cores disponíveis para a sua linha.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.catalogSection} data-nav-tone="light">
          <div className="site-shell">
            <div className={styles.filtersBar}>
              <div className={styles.filtersRow}>
                {processKeys.map((process) => (
                  <button
                    key={process}
                    type="button"
                    className={process === activeProcess ? styles.filterActive : styles.filterChip}
                    onClick={() => setActiveProcess(process)}
                    aria-pressed={process === activeProcess}
                  >
                    {processLabels[process]}
                  </button>
                ))}
              </div>

              <div className={styles.filterMeta}>
                <Filter size={16} strokeWidth={1.8} />
                <span>{filteredColors.length} cores visíveis</span>
              </div>
            </div>

            <div className={styles.catalogGrid}>
              <div className={styles.cardsColumn}>
                <div className={styles.cardsGrid}>
                  {filteredColors.map((color) => {
                    const isSelected = color.id === selectedColor.id;

                    return (
                      <button
                        key={color.id}
                        type="button"
                        className={isSelected ? styles.cardSelected : styles.card}
                        onClick={() => setSelectedColorId(color.id)}
                        style={isSelected ? { borderColor: color.swatch } : undefined}
                      >
                        <div
                          className={styles.cardSwatch}
                          style={{
                            backgroundColor: color.swatch,
                            color: getReadableColor(color.swatch),
                          }}
                        >
                          <div className={styles.cardHeadline}>
                            <span className={styles.cardCode}>{`COD. ${color.code}`}</span>
                            <h2 className={styles.cardTitle}>{color.name}</h2>
                          </div>
                        </div>

                        <div className={styles.cardBody}>
                          <div className={styles.cardPills}>
                            {color.processes.map((process) => (
                              <span key={process} className={styles.processPill}>
                                {processShortLabels[process]}
                              </span>
                            ))}
                          </div>

                          <div className={styles.cardSection}>
                            <span className={styles.cardSectionLabel}>Polímeros</span>
                            <p className={styles.cardSectionValue}>{color.polymers.join(', ')}</p>
                          </div>

                          <div className={styles.cardStatusRow}>
                            <span
                              className={
                                color.heavyMetalsFree ? styles.statusPositive : styles.statusWarning
                              }
                            >
                              {color.heavyMetalsFree ? (
                                <ShieldCheck size={14} strokeWidth={1.9} />
                              ) : (
                                <ShieldAlert size={14} strokeWidth={1.9} />
                              )}
                              {color.heavyMetalsFree
                                ? 'Livre de metais pesados (atóxico)'
                                : 'Contém metais pesados'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.catalogClosingNotice}>
                  <span className={styles.catalogClosingIcon} aria-hidden="true">
                    <Construction size={20} strokeWidth={1.9} />
                  </span>

                  <div className={styles.catalogClosingCopy}>
                    <p className={styles.catalogClosingEyebrow}>Em construção</p>
                    <h2 className={styles.catalogClosingTitle}>
                      Novas cores, filtros e materiais técnicos em breve.
                    </h2>
                    <p className={styles.catalogClosingText}>
                      Estamos expandindo este catálogo com novas referências e conteúdos de apoio.
                    </p>
                  </div>
                </div>
              </div>

              <aside className={styles.detailColumn}>
                <div className={styles.detailPanel}>
                  <div
                    className={styles.detailHero}
                    style={{
                      backgroundColor: selectedColor.swatch,
                      color: getReadableColor(selectedColor.swatch),
                    }}
                  >
                    <div className={styles.detailHeroMeta}>
                      <span className={styles.detailCode}>{`COD. ${selectedColor.code}`}</span>
                      <h2 className={styles.detailName}>{selectedColor.name}</h2>
                    </div>
                  </div>

                  <div className={styles.alertBox}>
                    <span className={styles.alertBar} aria-hidden="true" />
                    <span className={styles.alertIcon} aria-hidden="true">
                      <AlertTriangle size={18} strokeWidth={2} />
                    </span>
                    <p className={styles.alertText}>
                      Cores sofrem variação em telas. Solicite uma amostra física antes de aprovar.
                    </p>
                  </div>

                  <div className={styles.detailStack}>
                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>Especificações Técnicas</h3>
                      <div className={styles.specList}>
                        {selectedColor.technicalSpecs.map((item) => (
                          <article key={item.label} className={styles.specItem}>
                            <span className={styles.specIcon}>{getSpecIcon(item.icon)}</span>
                            <div className={styles.specHeading}>
                              <p className={styles.specLabel}>{item.label}</p>
                            </div>
                            <div className={styles.specMeasure}>
                              <strong className={styles.specValue}>
                                {formatSpecValue(item.value, item.icon)}
                              </strong>
                              {item.description ? (
                                <p className={styles.specDescription}>{item.description}</p>
                              ) : null}
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>Aplicações</h3>
                      <div className={styles.specList}>
                        {selectedColor.applications.map((item) => (
                          <article key={item.label} className={styles.specItem}>
                            <span className={styles.specIcon}>{getSpecIcon(item.icon)}</span>
                            <div className={styles.specHeading}>
                              <p className={styles.specLabel}>{item.label}</p>
                            </div>
                            <div className={styles.specMeasure}>
                              <strong className={styles.specValue}>
                                {formatSpecValue(item.value, item.icon)}
                              </strong>
                              {item.description ? (
                                <p className={styles.specDescription}>{item.description}</p>
                              ) : null}
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className={styles.detailSection}>
                      <h3 className={styles.detailSectionTitle}>Responsável Técnico</h3>
                      <div className={styles.responsibleBlock}>
                        <p className={styles.responsibleName}>{selectedColor.responsible.name}</p>
                        <p className={styles.responsibleRole}>{selectedColor.responsible.role}</p>
                      </div>
                    </section>
                  </div>

                  <div className={styles.ctaStack}>
                    <FlowButton
                      href={`/solicitar-amostra?cor=${encodeURIComponent(selectedColor.name)}&codigo=${encodeURIComponent(selectedColor.code)}`}
                      className={styles.primaryCta}
                      text="Solicitar amostra desta cor"
                    />

                    <button type="button" className={styles.secondaryCta} disabled>
                      <Download size={16} strokeWidth={1.9} />
                      <span>Baixar laudo de análise (em breve)</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
