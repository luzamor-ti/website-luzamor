"use client";
import { useState } from "react";
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
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Decide which number to use based on what we pass
    const whatsappData = ctaWhatsappGlobal(
      title,
      whatsappNumber,
      messageText,
      globalWhatsapp,
    );

    // Inject user's name into the message
    const finalUrl = decodeURIComponent(whatsappData.href)
      .replace("{nome}", name)
      .replace("{curso}", title)
      .replace("{itemName}", title);

    window.open(encodeURI(finalUrl), "_blank");
  };

  return (
    <div>
      <h3 className="border-gray-200 text-2xl font-bold mb-4 text-gray-900 border-t pt-4">
        Inscrever-se
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seu nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-gray-900"
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        <Button
          variant="primary"
          size="md"
          type="submit"
          fullWidth
          className="font-semibold"
        >
          {buttonText || "Inscrever-se via WhatsApp"}
        </Button>
      </form>
    </div>
  );
}
