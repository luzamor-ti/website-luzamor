import { Section, Heading, Button } from "@/components/ui";
import { Course } from "@/sanity/lib/types/course";
import { EVENT_DETAIL_FALLBACKS } from "@/constants/textFallbacks";

interface CourseEnrollmentProps {
  enrollment: Course["enrollment"];
  globalWhatsapp?: string;
}

export function CourseEnrollment({
  enrollment,
  globalWhatsapp,
}: CourseEnrollmentProps) {
  const whatsappNumber =
    enrollment.whatsapp ||
    globalWhatsapp ||
    EVENT_DETAIL_FALLBACKS.globalWhatsapp;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enrollment.messageText || "")}`;
  return (
    <Section className="bg-primary text-white text-center">
      <div className="max-w-2xl mx-auto">
        <Heading level={2} className="text-white mb-6">
          Ficou interessado?
        </Heading>
        <Button
          href={whatsappUrl}
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        >
          {enrollment.buttonText || "Quero me inscrever"}
        </Button>
      </div>
    </Section>
  );
}
