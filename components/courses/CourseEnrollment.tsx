import { Section, Heading, Button } from "@/components/ui";
import { Course } from "@/sanity/lib/types/course";

interface CourseEnrollmentProps {
  enrollment: Course["enrollment"];
}

export function CourseEnrollment({ enrollment }: CourseEnrollmentProps) {
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
