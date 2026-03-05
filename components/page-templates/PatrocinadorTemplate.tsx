"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Page } from "@/sanity/lib/types/page";
import {
  Supporter,
  SupporterCategory,
  PartnersPageData,
} from "@/sanity/lib/types/supporter";
import { urlFor } from "@/sanity/lib/image";
import {
  fadeInVariants,
  slideUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import {
  Section,
  SectionHeader,
  Grid,
  Card,
  Button,
  Accordion,
  Heading,
  Text,
} from "@/components/ui";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
interface PatrocinadorTemplateProps extends PartnersPageData {
  pagina: Page;
}

type TabKey = "2026" | "past";

// ─────────────────────────────────────────
// Sub-component: Partner Card
// ─────────────────────────────────────────
function PartnerCard({
  partner,
  isRound = false,
}: {
  partner: Supporter;
  isRound?: boolean;
}) {
  const cardContent = (
    <Card
      padding="sm"
      className="flex flex-col items-center justify-center gap-3 h-full min-h-[120px] md:min-h-[140px]"
    >
      {partner.logo ? (
        isRound ? (
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-none">
            <Image
              src={urlFor(partner.logo).width(96).height(96).fit("crop").url()}
              alt={partner.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full h-16 md:h-20 flex-none">
            <Image
              src={urlFor(partner.logo).width(200).fit("max").url()}
              alt={partner.name}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              className="object-contain"
            />
          </div>
        )
      ) : (
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-none">
          <span className="text-primary font-bold text-xl">
            {partner.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="text-sm font-semibold text-gray-700 text-center leading-tight">
        {partner.name}
      </span>
    </Card>
  );

  if (partner.site) {
    return (
      <motion.a
        variants={staggerItemVariants}
        href={partner.site}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
        aria-label={`Visitar site de ${partner.name}`}
      >
        {cardContent}
      </motion.a>
    );
  }

  return <motion.div variants={staggerItemVariants}>{cardContent}</motion.div>;
}

// ─────────────────────────────────────────
// Sub-component: Partner Groups (Accordion)
// ─────────────────────────────────────────
function PartnerGroups({
  title,
  categories,
}: {
  title: string;
  categories: SupporterCategory[];
}) {
  if (!categories.length) return null;

  const accordionItems = categories.map((cat) => ({
    id: cat._id,
    title: cat.title,
    content: (
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2 pb-4"
      >
        {cat.supporters.map((supporter) => (
          <PartnerCard key={supporter._id} partner={supporter} />
        ))}
      </motion.div>
    ),
  }));

  return (
    <motion.div variants={fadeInVariants} className="mb-10">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">
        {title}
      </h3>
      <Accordion items={accordionItems} allowMultiple />
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Sub-component: Donor Group
// ─────────────────────────────────────────
function DonorGroup({
  title,
  donors,
  emptyMessage,
}: {
  title: string;
  donors: Supporter[];
  emptyMessage: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className="flex flex-col gap-4">
      <h4 className="text-lg md:text-xl font-bold text-gray-800">{title}</h4>
      {donors.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {donors.map((d) => (
            <PartnerCard key={d._id} partner={d} isRound />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">{emptyMessage}</p>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Sub-component: Animated Section Wrapper
// ─────────────────────────────────────────
function AnimatedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Main Template
// ─────────────────────────────────────────
export function PatrocinadorTemplate({
  pagina,
  pageConfig,
  sponsors2026,
  supporters2026,
  pastSponsors,
  pastSupporters,
  individualSupporters,
  monthlyDonors,
  punctualDonors,
}: PatrocinadorTemplateProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("2026");

  const hasCurrentYear = sponsors2026.length > 0 || supporters2026.length > 0;
  const hasPastYears = pastSponsors.length > 0 || pastSupporters.length > 0;
  const hasIndividuals = individualSupporters.length > 0;
  const hasDonors = monthlyDonors.length > 0 || punctualDonors.length > 0;

  // ── Valores com fallback para quando o CMS ainda não tem dados ──
  const hero = pageConfig?.hero;
  const cta = pageConfig?.ctaPrincipal;
  const partners = pageConfig?.partnersSection;
  const individuals = pageConfig?.individualsSection;
  const donors = pageConfig?.donorsSection;
  const ctaFinal = pageConfig?.ctaFinal;

  const bgImage = hero?.backgroundImage;
  const tab2026Label = partners?.tab2026Label || "Parceiros de 2026";
  const tabPastLabel = partners?.tabPastLabel || "Parceiros Anteriores";

  return (
    <main className="min-h-screen">
      {/* ── Hero com imagem de fundo ── */}
      <Section className="relative min-h-[420px] md:min-h-[500px] flex items-end pt-24">
        {/* Imagem de fundo */}
        {bgImage ? (
          <>
            <Image
              src={urlFor(bgImage)
                .width(1920)
                .height(600)
                .fit("crop")
                .auto("format")
                .url()}
              alt={bgImage.alt || ""}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-secondary/10" />
        )}

        {/* Conteúdo */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 pt-8">
          <SectionHeader
            tag={hero?.tag}
            title={hero?.title || pagina.title}
            description={hero?.description || pagina.description}
            align="center"
            variant="dark"
          />
        </div>
      </Section>

      {/* ── CTA Principal ── */}
      <Section className="!py-12">
        <AnimatedSection className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-gray-100 rounded-2xl p-8 md:p-12 text-center">
          <motion.div variants={slideUpVariants}>
            <Heading level={2} className="mb-4">
              {cta?.title || "Faça Parte da Mudança"}
            </Heading>
            <Text
              variant="large"
              className="max-w-2xl mx-auto mb-8 text-gray-600"
            >
              {cta?.description ||
                "Sua empresa ou você pode transformar vidas. Conheça as formas de apoiar a Fundação Luz & Amor e juntos faremos mais."}
            </Text>
          </motion.div>
          <motion.div
            variants={fadeInVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button href="/contato" size="lg">
              {cta?.sponsorButtonText || "Seja um Patrocinador"}
            </Button>
            <Button href="/contato" variant="outline" size="lg">
              {cta?.supporterButtonText || "Seja um Apoiador"}
            </Button>
            <Button href="/contato" variant="outline-secondary" size="lg">
              {cta?.donorButtonText || "Faça uma Doação"}
            </Button>
          </motion.div>
        </AnimatedSection>
      </Section>

      {/* ── Patrocinadores e Apoiadores (Tabs) ── */}
      {(hasCurrentYear || hasPastYears) && (
        <Section id="parceiros">
          <AnimatedSection>
            <motion.div variants={fadeInVariants}>
              <SectionHeader
                tag={partners?.tag || "Parceiros"}
                title={partners?.title || "Patrocinadores e Apoiadores"}
                description={
                  partners?.description ||
                  "Empresas, instituições e editais que acreditam e investem no nosso trabalho."
                }
              />
            </motion.div>

            <motion.div variants={slideUpVariants}>
              <div
                className="flex gap-2 p-1 bg-gray-100 rounded-xl w-full sm:w-fit mx-auto mb-10"
                role="tablist"
              >
                {(
                  [
                    ["2026", tab2026Label],
                    ["past", tabPastLabel],
                  ] as [TabKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={activeTab === key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeTab === key
                        ? "bg-white text-primary shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Ambas as abas ficam montadas — CSS show/hide preserva o estado do accordion */}
            <div>
              <div className={activeTab === "2026" ? "block" : "hidden"}>
                <PartnerGroups
                  title={`Patrocinadores ${new Date().getFullYear()}`}
                  categories={sponsors2026}
                />
                <PartnerGroups
                  title={`Apoiadores ${new Date().getFullYear()}`}
                  categories={supporters2026}
                />
                {!hasCurrentYear && (
                  <Text variant="muted" className="text-center py-8">
                    {partners?.emptyCurrentMessage ||
                      "Nenhuma parceria cadastrada para 2026 ainda."}
                  </Text>
                )}
              </div>

              <div className={activeTab === "past" ? "block" : "hidden"}>
                <PartnerGroups
                  title="Patrocinadores Anteriores"
                  categories={pastSponsors}
                />
                <PartnerGroups
                  title="Apoiadores Anteriores"
                  categories={pastSupporters}
                />
                {!hasPastYears && (
                  <Text variant="muted" className="text-center py-8">
                    {partners?.emptyPastMessage ||
                      "Nenhuma parceria anterior cadastrada."}
                  </Text>
                )}
              </div>
            </div>
          </AnimatedSection>
        </Section>
      )}

      {/* ── Apoiadores Individuais ── */}
      {hasIndividuals && (
        <Section>
          <AnimatedSection>
            <motion.div variants={fadeInVariants}>
              <SectionHeader
                tag={individuals?.tag || "Pessoas que fazem a diferença"}
                title={individuals?.title || "Apoiadores Individuais"}
                description={
                  individuals?.description ||
                  "Pessoas físicas que contribuem com sua presença e apoio direto à fundação."
                }
              />
            </motion.div>
            <Grid cols={4} gap="md">
              {individualSupporters.map((supporter) => (
                <PartnerCard key={supporter._id} partner={supporter} isRound />
              ))}
            </Grid>
          </AnimatedSection>
        </Section>
      )}
      {/* ── CTA Final ── */}
      <Section className="bg-primary !py-16">
        <AnimatedSection className="text-center">
          <motion.div variants={slideUpVariants}>
            <Heading level={2} className="text-white mb-4">
              {ctaFinal?.title || "Sua empresa pode estar aqui"}
            </Heading>
            <Text
              variant="large"
              className="!text-white/80 max-w-xl mx-auto mb-8"
            >
              {ctaFinal?.description ||
                "Entre em contato e descubra como fazer parte da rede de parceiros da Fundação Luz & Amor."}
            </Text>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <Button href="/contato" variant="secondary" size="lg">
              {ctaFinal?.buttonText || "Entrar em Contato"}
            </Button>
          </motion.div>
        </AnimatedSection>
      </Section>
      {/* ── Doadores ── */}
      {hasDonors && (
        <Section>
          <AnimatedSection>
            <motion.div variants={fadeInVariants}>
              <SectionHeader
                tag={donors?.tag || "Gratidão"}
                title={donors?.title || "Nossos Doadores"}
                description={
                  donors?.description ||
                  "Cada contribuição, pequena ou grande, faz toda a diferença em nossa missão."
                }
              />
            </motion.div>
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <DonorGroup
                title={donors?.monthlyTitle || "Doadores Mensais"}
                donors={monthlyDonors}
                emptyMessage="Nenhum doador mensal cadastrado ainda."
              />
              <DonorGroup
                title={donors?.punctualTitle || "Doadores Pontuais"}
                donors={punctualDonors}
                emptyMessage="Nenhum doador pontual cadastrado ainda."
              />
            </motion.div>
          </AnimatedSection>
        </Section>
      )}
    </main>
  );
}
