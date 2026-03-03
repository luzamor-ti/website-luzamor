import { Section, Heading, Button } from "@/components/ui";
export function CourseEnrollment({ enrollment }: any) {
  const whatsappUrl = `https://wa.me/${enrollment.whatsapp}?text=${encodeURIComponent(enrollment.messageText || "")}`;
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
