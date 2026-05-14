import { Section, Heading, Text, Button } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { portableTextComponents } from "@/constants/portableTextComponents";
import { CourseEnrollmentForm } from "./CourseEnrollmentForm";

interface CourseDescriptionProps {
  description: PortableTextBlock[];
  schedule?: string;
  monthlyOptions?: {
    title: string;
    free: boolean;
    price?: number;
    details?: string;
  }[];
  enrollment?: {
    active: boolean;
    buttonText?: string;
    messageText?: string;
  };
  courseTitle: string;
  whatsappNumber?: string;
  globalWhatsapp?: string;
}

export function CourseDescription({
  description,
  schedule,
  monthlyOptions,
  enrollment,
  courseTitle,
  whatsappNumber,
  globalWhatsapp,
}: CourseDescriptionProps) {
  return (
    <Section className="my-12 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <Heading level={2} className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Sobre o Curso
            </Heading>

            <div className="p-6 bg-white shadow-md border border-gray-100 rounded-3xl space-y-6">
              {schedule && (
                <div>
                  <Heading level={4} className="mb-2 text-primary font-bold">
                    Datas e Horários
                  </Heading>
                  <Text className="font-medium text-gray-700 leading-relaxed">{schedule}</Text>
                </div>
              )}

              {/* Pricing Options */}
              {monthlyOptions && monthlyOptions.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <Heading level={4} className="mb-3 text-primary font-bold">
                    Valor Mensal
                  </Heading>
                  <div className="space-y-4">
                    {monthlyOptions.map((opt, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{opt.title}</span>
                        <span className="text-gray-700 font-medium mt-1">
                          {opt.free ? "Gratuito" : opt.price ? `R$ ${opt.price.toFixed(2).replace('.', ',')}` : "Valor sob consulta"}
                        </span>
                        {opt.details && <span className="text-sm text-gray-500 mt-1">{opt.details}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {enrollment?.active !== false && (
                <div className="pt-2">
                  <CourseEnrollmentForm
                    title={courseTitle}
                    buttonText={enrollment?.buttonText}
                    messageText={enrollment?.messageText}
                    whatsappNumber={whatsappNumber}
                    globalWhatsapp={globalWhatsapp}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-600">
              <PortableText
                value={description}
                components={portableTextComponents}
              />
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
