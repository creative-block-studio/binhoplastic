'use client';

import Image from 'next/image';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Factory,
  FlaskConical,
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
import { useLenisScroll } from '@/components/ui/use-lenis-scroll';
import styles from '@/components/ui/request-sample-page.module.css';
import whatsappIcon from '@/public/assets/images/whatsapp-icon-figma-22.png';

const processOptions = ['Injeção', 'Sopro', 'Extrusão', 'Filme', 'Fios e cabos'] as const;

const resinOptions = ['PE', 'PP', 'PS', 'PVC', 'PET', 'ABS'] as const;

export function RequestSamplePage() {
  useLenisScroll();

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

              <form className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="full-name">
                    Nome completo <span className={styles.requiredMark}>*</span>
                  </label>
                  <div className={styles.fieldBox}>
                    <UserRound className={styles.fieldIcon} size={16} aria-hidden="true" />
                    <input
                      id="full-name"
                      name="full-name"
                      className={styles.fieldControl}
                      type="text"
                      placeholder="Seu nome completo"
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
                      placeholder="Nome da empresa"
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
                      placeholder="(00) 00000-0000"
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
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className={styles.rowFields}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="process">
                      Processo <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.fieldBox}>
                      <Factory className={styles.fieldIcon} size={16} aria-hidden="true" />
                      <select
                        id="process"
                        name="process"
                        className={styles.fieldControl}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {processOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className={styles.fieldSelectChevron}
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="resin">
                      Resina <span className={styles.requiredMark}>*</span>
                    </label>
                    <div className={styles.fieldBox}>
                      <FlaskConical className={styles.fieldIcon} size={16} aria-hidden="true" />
                      <select
                        id="resin"
                        name="resin"
                        className={styles.fieldControl}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {resinOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className={styles.fieldSelectChevron}
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
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
                      id="message"
                      name="message"
                      className={styles.fieldTextarea}
                      placeholder="Conte mais sobre sua necessidade, aplicação, volumes ou outros detalhes importantes para ajudarmos você."
                    />
                  </div>
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
                  <FlowButton className={styles.submitButton} text="Enviar solicitação" />
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
