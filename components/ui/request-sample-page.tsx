'use client';

import {
  type CSSProperties,
  type Dispatch,
  type FormEvent,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Factory,
  FlaskConical,
  type LucideIcon,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { FlowButton } from '@/components/ui/flow-button';
import { SiteFooter } from '@/components/ui/site-footer';
import { SiteHeader } from '@/components/ui/site-header';
import styles from '@/components/ui/request-sample-page.module.css';
import whatsappIcon from '@/public/assets/images/whatsapp-icon-figma-22.png';

const processOptions = ['Injeção', 'Sopro', 'Extrusão', 'Filme', 'Fios e cabos', 'Outro'] as const;

const resinOptions = ['PE', 'PP', 'PS', 'PVC', 'PET', 'ABS', 'Outro'] as const;

const dropdownAnimationMs = 220;

type DropdownKey = 'process' | 'resin';

type SubmissionState =
  | { kind: 'idle'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string };

type MultiSelectFieldProps = {
  fieldRef: RefObject<HTMLDivElement | null>;
  optionsRef: RefObject<HTMLDivElement | null>;
  labelId: string;
  label: string;
  errorMessage: string;
  emptyLabel: string;
  singularLabel: string;
  pluralLabel: string;
  options: readonly string[];
  selectedValues: string[];
  isOpen: boolean;
  isMounted: boolean;
  hasError: boolean;
  panelId: string;
  Icon: LucideIcon;
  onToggle: () => void;
  onWheel: (event: WheelEvent<HTMLDivElement>, container: HTMLDivElement | null) => void;
  onSelect: (value: string) => void;
  getSelectionSummary: (
    values: string[],
    emptyText: string,
    singularText: string,
    pluralText: string,
  ) => string;
};

function MultiSelectField({
  fieldRef,
  optionsRef,
  labelId,
  label,
  errorMessage,
  emptyLabel,
  singularLabel,
  pluralLabel,
  options,
  selectedValues,
  isOpen,
  isMounted,
  hasError,
  panelId,
  Icon,
  onToggle,
  onWheel,
  onSelect,
  getSelectionSummary,
}: MultiSelectFieldProps) {
  return (
    <div className={styles.fieldGroup} ref={fieldRef}>
      <label className={styles.fieldLabel} id={labelId}>
        {label} <span className={styles.requiredMark}>*</span>
      </label>
      <div
        className={`${styles.multiSelectField} ${hasError ? styles.multiSelectFieldError : ''}`}
        aria-labelledby={labelId}
      >
        <button
          type="button"
          className={styles.multiSelectTrigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.multiSelectTriggerMain}>
            <Icon className={styles.multiSelectIcon} size={16} aria-hidden="true" />
            <span className={styles.multiSelectSummary}>
              {getSelectionSummary(selectedValues, emptyLabel, singularLabel, pluralLabel)}
            </span>
          </span>
          <ChevronDown
            className={isOpen ? styles.multiSelectChevronOpen : styles.multiSelectChevron}
            size={16}
            aria-hidden="true"
          />
        </button>

        {isMounted ? (
          <div
            id={panelId}
            className={styles.multiSelectPanel}
            data-state={isOpen ? 'open' : 'closed'}
            style={
              {
                '--dropdown-duration': `${dropdownAnimationMs}ms`,
              } as CSSProperties
            }
          >
            <div
              ref={optionsRef}
              className={styles.multiSelectOptions}
              onWheelCapture={(event) => onWheel(event, optionsRef.current)}
            >
              {options.map((option) => {
                const isActive = selectedValues.includes(option);

                return (
                  <label key={option} className={styles.multiSelectOptionRow}>
                    <input
                      type="checkbox"
                      className={styles.multiSelectCheckbox}
                      checked={isActive}
                      onChange={() => onSelect(option)}
                    />
                    <span className={styles.multiSelectOptionLabel}>{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      {hasError ? <p className={styles.fieldError}>{errorMessage}</p> : null}
    </div>
  );
}

export function RequestSamplePage() {
  const searchParams = useSearchParams();
  const prefilledMessage = searchParams.get('message') ?? '';
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [selectedResins, setSelectedResins] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mountedDropdowns, setMountedDropdowns] = useState<Record<DropdownKey, boolean>>({
    process: false,
    resin: false,
  });
  const [showSelectionErrors, setShowSelectionErrors] = useState(false);
  const processFieldRef = useRef<HTMLDivElement | null>(null);
  const resinFieldRef = useRef<HTMLDivElement | null>(null);
  const processOptionsRef = useRef<HTMLDivElement | null>(null);
  const resinOptionsRef = useRef<HTMLDivElement | null>(null);
  const messageFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    kind: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownCloseTimeoutsRef = useRef<Record<DropdownKey, number | null>>({
    process: null,
    resin: null,
  });

  const processSelectionError = showSelectionErrors && selectedProcesses.length === 0;
  const resinSelectionError = showSelectionErrors && selectedResins.length === 0;

  const toggleSelection = (
    value: string,
    setSelectedValues: Dispatch<SetStateAction<string[]>>,
  ) => {
    setSelectedValues((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get('fullName') ?? '').trim();
    const company = String(formData.get('company') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const companyWebsite = String(formData.get('companyWebsite') ?? '').trim();
    const hasProcess = selectedProcesses.length > 0;
    const hasResin = selectedResins.length > 0;

    event.preventDefault();
    setSubmissionState({ kind: 'idle', message: '' });

    if (!form.reportValidity()) {
      return;
    }

    if (!hasProcess || !hasResin) {
      setShowSelectionErrors(true);

      if (!hasProcess) {
        processFieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      resinFieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    void (async () => {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/request-sample', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            company,
            phone,
            email,
            message,
            processes: selectedProcesses,
            resins: selectedResins,
            companyWebsite,
          }),
        });

        const result = (await response.json().catch(() => null)) as
          | { error?: string; message?: string }
          | null;

        if (!response.ok) {
          setSubmissionState({
            kind: 'error',
            message:
              result?.error ??
              'Nao foi possivel enviar sua solicitacao agora. Tente novamente em instantes.',
          });
          return;
        }

        formRef.current?.reset();
        if (messageFieldRef.current) {
          messageFieldRef.current.value = '';
        }

        setSelectedProcesses([]);
        setSelectedResins([]);
        setShowSelectionErrors(false);
        setOpenDropdown(null);
        setMountedDropdowns({ process: false, resin: false });
        setSubmissionState({
          kind: 'success',
          message:
            result?.message ??
            'Solicitacao enviada com sucesso. Nosso time retorna em breve.',
        });
      } catch {
        setSubmissionState({
          kind: 'error',
          message:
            'Nao foi possivel enviar sua solicitacao agora. Tente novamente em instantes.',
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const getSelectionSummary = (
    values: string[],
    emptyLabel: string,
    singularLabel: string,
    pluralLabel: string,
  ) => {
    if (values.length === 0) {
      return emptyLabel;
    }

    if (values.length === 1) {
      return `1 ${singularLabel} selecionado`;
    }

    return `${values.length} ${pluralLabel} selecionados`;
  };

  const handleOptionsWheel = (
    event: WheelEvent<HTMLDivElement>,
    container: HTMLDivElement | null,
  ) => {
    if (!container) return;

    const maxScrollTop = container.scrollHeight - container.clientHeight;
    if (maxScrollTop <= 0) return;

    event.preventDefault();
    event.stopPropagation();

    const nextScrollTop = Math.max(0, Math.min(container.scrollTop + event.deltaY, maxScrollTop));
    container.scrollTop = nextScrollTop;
  };

  const handleTextareaWheel = (
    event: WheelEvent<HTMLTextAreaElement>,
    container: HTMLTextAreaElement | null,
  ) => {
    if (!container) return;

    const maxScrollTop = container.scrollHeight - container.clientHeight;
    if (maxScrollTop <= 0) return;

    const nextScrollTop = Math.max(0, Math.min(container.scrollTop + event.deltaY, maxScrollTop));
    if (nextScrollTop === container.scrollTop) return;

    event.preventDefault();
    event.stopPropagation();
    container.scrollTop = nextScrollTop;
  };

  const clearDropdownCloseTimeout = useCallback((key: DropdownKey) => {
    const timeoutId = dropdownCloseTimeoutsRef.current[key];

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      dropdownCloseTimeoutsRef.current[key] = null;
    }
  }, []);

  const closeDropdown = useCallback(
    (key: DropdownKey) => {
      if (openDropdown !== key && !mountedDropdowns[key]) {
        return;
      }

      clearDropdownCloseTimeout(key);
      setOpenDropdown((current) => (current === key ? null : current));
      dropdownCloseTimeoutsRef.current[key] = window.setTimeout(() => {
        setMountedDropdowns((current) => ({ ...current, [key]: false }));
        dropdownCloseTimeoutsRef.current[key] = null;
      }, dropdownAnimationMs);
    },
    [clearDropdownCloseTimeout, mountedDropdowns, openDropdown],
  );

  const openDropdownPanel = useCallback(
    (key: DropdownKey) => {
      const otherKey: DropdownKey = key === 'process' ? 'resin' : 'process';

      clearDropdownCloseTimeout(key);
      setMountedDropdowns((current) => ({ ...current, [key]: true }));
      closeDropdown(otherKey);

      window.requestAnimationFrame(() => {
        setOpenDropdown(key);
      });
    },
    [clearDropdownCloseTimeout, closeDropdown],
  );

  const toggleDropdown = useCallback(
    (key: DropdownKey) => {
      if (openDropdown === key) {
        closeDropdown(key);
        return;
      }

      openDropdownPanel(key);
    },
    [closeDropdown, openDropdown, openDropdownPanel],
  );

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (processFieldRef.current && !processFieldRef.current.contains(target)) {
        closeDropdown('process');
      }

      if (resinFieldRef.current && !resinFieldRef.current.contains(target)) {
        closeDropdown('resin');
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [closeDropdown]);

  useEffect(() => {
    return () => {
      clearDropdownCloseTimeout('process');
      clearDropdownCloseTimeout('resin');
    };
  }, [clearDropdownCloseTimeout]);

  return (
    <>
      <SiteHeader />
      <main id="inicio" className={styles.page}>
        <div className={styles.heroTone} data-nav-tone="dark" aria-hidden="true" />
        <div className={styles.bodyTone} data-nav-tone="light" aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.layout}>
            <section className={styles.infoColumn} aria-labelledby="request-sample-title">
              <div className={styles.intro}>
                <span className={styles.eyebrow}>Contato</span>
                <h1 id="request-sample-title" className={styles.title}>
                  Fale com nosso time
                </h1>
                <p className={styles.description}>
                  Nossa equipe técnica está pronta para entender sua necessidade e oferecer
                  a melhor solução.
                </p>
              </div>

              <div className={styles.contactStack}>
                <a
                  className={`${styles.contactCard} ${styles.contactCardPrimary}`}
                  href="https://wa.me/5511910089499"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.contactCardBody}>
                    <span className={styles.contactIconWrap} aria-hidden="true">
                      <Image src={whatsappIcon} alt="" width={22} height={22} />
                    </span>
                    <span className={styles.contactTextGroup}>
                      <span className={styles.contactLabel}>WhatsApp</span>
                      <span className={styles.contactMeta}>Fale agora pelo WhatsApp</span>
                    </span>
                  </span>
                  <ChevronRight
                    className={styles.contactCardArrow}
                    size={22}
                    aria-hidden="true"
                  />
                </a>

                <div className={`${styles.contactCard} ${styles.contactCardStatic}`}>
                  <span className={styles.contactCardBody}>
                    <span className={styles.contactIconWrap} aria-hidden="true">
                      <Phone size={20} />
                    </span>
                    <span className={styles.contactTextGroup}>
                      <span className={styles.contactLabel}>Telefone</span>
                      <span className={styles.contactMeta}>(11) 91008-9499</span>
                    </span>
                  </span>
                </div>

                <div className={`${styles.contactCard} ${styles.contactCardStatic}`}>
                  <span className={styles.contactCardBody}>
                    <span className={styles.contactIconWrap} aria-hidden="true">
                      <Mail size={20} />
                    </span>
                    <span className={styles.contactTextGroup}>
                      <span className={styles.contactLabel}>E-mail</span>
                      <span className={styles.contactMeta}>comercial@binhoplastic.com.br</span>
                    </span>
                  </span>
                </div>
              </div>

              <div className={styles.addressRow}>
                <span className={styles.contactIconWrap} aria-hidden="true">
                  <MapPin size={22} />
                </span>
                <span className={styles.addressText}>
                  <span className={styles.addressLabel}>Endereço</span>
                  <span className={styles.addressMeta}>
                    Rua Galvão, 165 - Qta da Boa Vista - Itaquaquecetuba - SP
                  </span>
                </span>
              </div>
            </section>

            <section className={styles.formCard} aria-labelledby="request-sample-form-title">
              <h2 id="request-sample-form-title" className={styles.formTitle}>
                Envie sua solicitação
              </h2>
              <p className={styles.formDescription}>
                Preencha os dados abaixo e nossa equipe retorna com orientação técnica.
              </p>

              <div className={styles.highlights}>
                <span className={styles.highlightItem}>
                  <Clock3 size={16} aria-hidden="true" />
                  Retorno em até 1 dia útil
                </span>
                <span className={styles.highlightItem}>
                  <ShieldCheck size={16} aria-hidden="true" />
                  Atendimento técnico especializado
                </span>
              </div>

              <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="full-name">
                    Nome completo <span className={styles.requiredMark}>*</span>
                  </label>
                  <div className={styles.fieldBox}>
                    <UserRound className={styles.fieldIcon} size={16} aria-hidden="true" />
                    <input
                      id="full-name"
                      name="fullName"
                      className={styles.fieldControl}
                      type="text"
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="company">
                    Empresa <span className={styles.requiredMark}>*</span>
                  </label>
                  <div className={styles.fieldBox}>
                    <Building2 className={styles.fieldIcon} size={16} aria-hidden="true" />
                    <input
                      id="company"
                      name="company"
                      className={styles.fieldControl}
                      type="text"
                      autoComplete="organization"
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="phone">
                    Telefone <span className={styles.requiredMark}>*</span>
                  </label>
                  <div className={styles.fieldBox}>
                    <Phone className={styles.fieldIcon} size={16} aria-hidden="true" />
                    <input
                      id="phone"
                      name="phone"
                      className={styles.fieldControl}
                      type="tel"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="email">
                    E-mail <span className={styles.requiredMark}>*</span>
                  </label>
                  <div className={styles.fieldBox}>
                    <Mail className={styles.fieldIcon} size={16} aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      className={styles.fieldControl}
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.rowFields}>
                  <MultiSelectField
                    fieldRef={processFieldRef}
                    optionsRef={processOptionsRef}
                    labelId="process-group-label"
                    label="Processo"
                    errorMessage="Selecione pelo menos um processo."
                    emptyLabel="Selecione os processos"
                    singularLabel="processo"
                    pluralLabel="processos"
                    options={processOptions}
                    selectedValues={selectedProcesses}
                    isOpen={openDropdown === 'process'}
                    isMounted={mountedDropdowns.process}
                    hasError={processSelectionError}
                    panelId="process-options-panel"
                    Icon={Factory}
                    onToggle={() => toggleDropdown('process')}
                    onWheel={handleOptionsWheel}
                    onSelect={(value) => toggleSelection(value, setSelectedProcesses)}
                    getSelectionSummary={getSelectionSummary}
                  />

                  <MultiSelectField
                    fieldRef={resinFieldRef}
                    optionsRef={resinOptionsRef}
                    labelId="resin-group-label"
                    label="Resina"
                    errorMessage="Selecione pelo menos uma resina."
                    emptyLabel="Selecione as resinas"
                    singularLabel="resina"
                    pluralLabel="resinas"
                    options={resinOptions}
                    selectedValues={selectedResins}
                    isOpen={openDropdown === 'resin'}
                    isMounted={mountedDropdowns.resin}
                    hasError={resinSelectionError}
                    panelId="resin-options-panel"
                    Icon={FlaskConical}
                    onToggle={() => toggleDropdown('resin')}
                    onWheel={handleOptionsWheel}
                    onSelect={(value) => toggleSelection(value, setSelectedResins)}
                    getSelectionSummary={getSelectionSummary}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    Mensagem
                  </label>
                  <div className={`${styles.fieldBox} ${styles.fieldBoxTextarea}`}>
                    <MessageSquareText
                      className={styles.fieldIcon}
                      size={16}
                      aria-hidden="true"
                    />
                    <textarea
                      ref={messageFieldRef}
                      id="message"
                      name="message"
                      className={styles.fieldTextarea}
                      defaultValue={prefilledMessage}
                      onWheelCapture={(event) =>
                        handleTextareaWheel(event, messageFieldRef.current)
                      }
                      placeholder="Conte mais sobre sua necessidade, aplicação, volumes ou outros detalhes importantes para ajudarmos você."
                    />
                  </div>
                </div>

                <div className={styles.honeypotField} aria-hidden="true">
                  <label htmlFor="company-website">Site da empresa</label>
                  <input
                    id="company-website"
                    name="companyWebsite"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.submitRow}>
                  <div className={styles.privacyNote}>
                    <div className={styles.privacyText}>
                      <strong className={styles.privacyTitle}>Seus dados estão seguros</strong>
                      <p className={styles.privacyCopy}>
                        Utilizamos suas informações apenas para atendimento da sua
                        solicitação.
                      </p>
                    </div>
                  </div>
                  <div className={styles.submitActions}>
                    {submissionState.kind !== 'idle' ? (
                      <p
                        className={`${styles.submitStatus} ${
                          submissionState.kind === 'success'
                            ? styles.submitStatusSuccess
                            : styles.submitStatusError
                        }`}
                        role={submissionState.kind === 'error' ? 'alert' : 'status'}
                      >
                        {submissionState.message}
                      </p>
                    ) : null}
                    <FlowButton
                      buttonType="submit"
                      className={styles.submitButton}
                      disabled={isSubmitting}
                      text={isSubmitting ? 'Enviando...' : 'Enviar solicitação'}
                    />
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
