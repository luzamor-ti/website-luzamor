"use client";
import { Course } from "@/sanity/lib/types/course";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Text } from "../ui";
import { Calendar, Ticket, UserCheck } from "lucide-react";
import { ctaWhatsappGlobal } from "@/utils/ctaWhatsappGlobal";

interface EnrollmentModalProps {
  course: Course;
  whatsappNumber?: string; // Do curso
  globalWhatsapp?: string; // Da fundação (Sanity)
}

export function CourseForm({
  course,
  whatsappNumber,
  globalWhatsapp,
}: EnrollmentModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // A utility decide qual número usar com base no que passamos
    const whatsappData = ctaWhatsappGlobal(
      course.title,
      whatsappNumber,
      course.enrollment?.messageText,
      globalWhatsapp,
    );

    // Injeta o nome do usuário na mensagem
    const finalUrl = decodeURIComponent(whatsappData.href)
      .replace("{nome}", name)
      .replace("{curso}", course.title)
      .replace("{itemName}", course.title);

    window.open(encodeURI(finalUrl), "_blank");
  };

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(course.price || 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl bg-white border-gray-100"
    >
      {/* Informações de Preço */}
      {course.price && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Ticket size={24} className="text-primary" />
            <Text
              variant="small"
              className="text-gray-600 uppercase font-bold tracking-wide"
            >
              Valor do Ingresso
            </Text>
          </div>
          <Text
            variant="small"
            className="font-bold text-primary text-xl tracking-wide"
          >
            {formattedPrice}
          </Text>
        </div>
      )}

      {/* Detalhes do Curso */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <UserCheck size={16} className="text-primary" />
          <span className="text-sm font-medium">Idade mínima: 16 anos</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-primary" />
            <Text
              variant="small"
              className="text-gray-500 uppercase font-semibold"
            >
              Data e Horário
            </Text>
          </div>
          <Text className="italic text-gray-700">
            {course.schedule || "A definir"}
          </Text>
        </div>
      </div>

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
          {course.enrollment?.buttonText || "Inscrever-se via WhatsApp"}
        </Button>
      </form>
    </motion.div>
  );
}
