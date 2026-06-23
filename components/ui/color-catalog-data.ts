export type ProcessKey =
  | 'todos'
  | 'injecao'
  | 'extrusao'
  | 'sopro'
  | 'rotomoldagem'
  | 'filme'
  | 'fios-cabos';

export type SpecIcon = 'temperature' | 'sun' | 'migration' | 'pigment' | 'percent' | 'shield';

export type SpecItem = {
  label: string;
  value: string;
  description: string;
  icon: SpecIcon;
};

export type CatalogColor = {
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

export const processLabels: Record<ProcessKey, string> = {
  todos: 'Todos',
  injecao: 'Injeção',
  extrusao: 'Extrusão',
  sopro: 'Sopro',
  rotomoldagem: 'Rotomoldagem',
  filme: 'Filme',
  'fios-cabos': 'Fios & Cabos',
};

export const processKeys = Object.keys(processLabels) as ProcessKey[];

export const processShortLabels: Record<Exclude<ProcessKey, 'todos'>, string> = {
  injecao: 'INJ',
  extrusao: 'EXT',
  sopro: 'SOP',
  rotomoldagem: 'ROT',
  filme: 'FILM',
  'fios-cabos': 'FIO',
};

export const defaultSelectedColorId = 'b008831';

export const catalogColors: CatalogColor[] = [
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
