"use client";
import { Button } from "../ui";
import { ctaWhatsappGlobal } from "@/utils/ctaWhatsappGlobal";

interface CourseEnrollmentFormProps {
  title: string;
  buttonText?: string;
  messageText?: string;
  whatsappNumber?: string;
  globalWhatsapp?: string;
}

export function CourseEnrollmentForm({
  title,
  buttonText,
  messageText,
  whatsappNumber,
  globalWhatsapp,
}: CourseEnrollmentFormProps) {
  const handleClick = () => {
    const whatsappData = ctaWhatsappGlobal(
      title,
      whatsappNumber,
      messageText,
      globalWhatsapp,
    );

    // Send directly to WhatsApp without name capture
    const finalUrl = decodeURIComponent(whatsappData.href)
      .replace("{nome}", "")
      .replace("{curso}", title)
      .replace("{itemName}", title)
      .trim();

    window.open(encodeURI(finalUrl), "_blank");
  };

  return (
    <div>
      <Button
        variant="primary"
        size="md"
        fullWidth
        className="font-semibold"
        onClick={handleClick}
      >
        {buttonText || "Saiba mais"}
      </Button>
    </div>
  );
}
