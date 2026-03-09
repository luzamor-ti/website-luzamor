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
import { PARTNERS_PAGE_FALLBACKS } from "@/constants/textFallbacks";

const CURRENT_YEAR = new Date().getFullYear();

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
interface PatrocinadorTemplateProps extends PartnersPageData {
  pagina: Page;
}

type TabKey = "current" | "past";

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
  currentSponsors,
  currentSupporters,
  pastSponsors,
  pastSupporters,
  individualSupporters,
  monthlyDonors,
  punctualDonors,
}: PatrocinadorTemplateProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("current");

  const hasCurrentYear =
    currentSponsors.length > 0 || currentSupporters.length > 0;
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

  const bgImage = hero?.backgroundImage || null;
  const tab2026Label =
    partners?.tabCurrentLabel ||
    PARTNERS_PAGE_FALLBACKS.partnersSection.tabCurrentLabel;
  const tabPastLabel =
    partners?.tabPastLabel ||
    PARTNERS_PAGE_FALLBACKS.partnersSection.tabPastLabel;

  return (
    <main className="min-h-screen">
      {/* ── Hero com imagem de fundo ── */}
      <Section className="relative bg-[#0a0a0a] pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('${
              bgImage
                ? urlFor(bgImage)
                    .width(1920)
                    .height(600)
                    .fit("crop")
                    .auto("format")
                    .url()
                : ""
            }')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/80" />
        <div className="relative z-10 max-w-5xl">
          <SectionHeader
            tag={hero?.tag || PARTNERS_PAGE_FALLBACKS.hero.tag}
            title={
              hero?.title || pagina.title || PARTNERS_PAGE_FALLBACKS.hero.title
            }
            description={
              hero?.description || PARTNERS_PAGE_FALLBACKS.hero.description
            }
            variant="dark"
            align="left"
          >
            <motion.div
              variants={fadeInVariants}
              className="flex flex-col gap-4 mt-16"
            >
              <p className="text-lg font-semibold text-white">
                {cta?.title || PARTNERS_PAGE_FALLBACKS.cta.title}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contato" variant="primary" showArrow>
                  {cta?.sponsorButtonText ||
                    PARTNERS_PAGE_FALLBACKS.cta.sponsorButtonText}
                </Button>
                <Button href="/contato" variant="outline">
                  {cta?.supporterButtonText ||
                    PARTNERS_PAGE_FALLBACKS.cta.supporterButtonText}
                </Button>
                <Button href="/contato" variant="ghost">
                  {cta?.donorButtonText ||
                    PARTNERS_PAGE_FALLBACKS.cta.donorButtonText}
                </Button>
              </div>
            </motion.div>
          </SectionHeader>
        </div>
      </Section>

      {/* ── Patrocinadores e Apoiadores (Tabs) ── */}
      {(hasCurrentYear || hasPastYears) && (
        <Section id="parceiros">
          <AnimatedSection>
            <motion.div variants={fadeInVariants}>
              <SectionHeader
                tag={
                  partners?.tag || PARTNERS_PAGE_FALLBACKS.partnersSection.tag
                }
                title={
                  partners?.title ||
                  PARTNERS_PAGE_FALLBACKS.partnersSection.title
                }
                description={
                  partners?.description ||
                  PARTNERS_PAGE_FALLBACKS.partnersSection.description
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
                    ["current", tab2026Label],
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
              <div className={activeTab === "current" ? "block" : "hidden"}>
                <PartnerGroups
                  title={`Patrocinadores ${CURRENT_YEAR}`}
                  categories={currentSponsors}
                />
                <PartnerGroups
                  title={`Apoiadores ${CURRENT_YEAR}`}
                  categories={currentSupporters}
                />
                {!hasCurrentYear && (
                  <Text variant="muted" className="text-center py-8">
                    {partners?.emptyCurrentMessage ||
                      PARTNERS_PAGE_FALLBACKS.partnersSection
                        .emptyCurrentMessage}
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
                      PARTNERS_PAGE_FALLBACKS.partnersSection.emptyPastMessage}
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
                tag={
                  individuals?.tag ||
                  PARTNERS_PAGE_FALLBACKS.individualsSection.tag
                }
                title={
                  individuals?.title ||
                  PARTNERS_PAGE_FALLBACKS.individualsSection.title
                }
                description={
                  individuals?.description ||
                  PARTNERS_PAGE_FALLBACKS.individualsSection.description
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
              {ctaFinal?.title || PARTNERS_PAGE_FALLBACKS.ctaFinal.title}
            </Heading>
            <Text
              variant="large"
              className="!text-white/80 max-w-xl mx-auto mb-8"
            >
              {ctaFinal?.description ||
                PARTNERS_PAGE_FALLBACKS.ctaFinal.description}
            </Text>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <Button href="/contato" variant="secondary" size="lg">
              {ctaFinal?.buttonText ||
                PARTNERS_PAGE_FALLBACKS.ctaFinal.buttonText}
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
                tag={donors?.tag || PARTNERS_PAGE_FALLBACKS.donorsSection.tag}
                title={
                  donors?.title || PARTNERS_PAGE_FALLBACKS.donorsSection.title
                }
                description={
                  donors?.description ||
                  PARTNERS_PAGE_FALLBACKS.donorsSection.description
                }
              />
            </motion.div>
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <DonorGroup
                title={
                  donors?.monthlyTitle ||
                  PARTNERS_PAGE_FALLBACKS.donorsSection.monthlyTitle
                }
                donors={monthlyDonors}
                emptyMessage={
                  PARTNERS_PAGE_FALLBACKS.donorsSection.emptyMonthly
                }
              />
              <DonorGroup
                title={
                  donors?.punctualTitle ||
                  PARTNERS_PAGE_FALLBACKS.donorsSection.punctualTitle
                }
                donors={punctualDonors}
                emptyMessage={
                  PARTNERS_PAGE_FALLBACKS.donorsSection.emptyPunctual
                }
              />
            </motion.div>
          </AnimatedSection>
        </Section>
      )}
    </main>
  );
}
