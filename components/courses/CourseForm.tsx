"use client";
import { Course } from "@/sanity/lib/types/course";
import { useState } from "react";
import { motion } from "framer-motion";
import { Text } from "../ui";
import { Calendar, MapPin, Ticket, UserCheck } from "lucide-react";

interface EnrollmentModalProps {
  course: Course;
  whatsappNumber: string;
}

export function CourseForm({ course, whatsappNumber }: EnrollmentModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const messageTemplate =
      course.enrollment.messageText ||
      "Olá! Gostaria de me inscrever no curso {curso}. Meu nome é {nome}.";

    const message = messageTemplate
      .replace("{curso}", course.title)
      .replace("{nome}", name);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(course.price || 0);

  return (
    <motion.div
      className="rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl bg-white border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* CUSTOS */}
      {course.price && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary mb-6">
          <div className="flex items-center gap-2 mb-4">
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
            className="font-bold text-primary tracking-wide"
          >
            {formattedPrice}
          </Text>
        </div>
      )}
      {/* IDADE MÍNIMA */}
      <div className="flex items-center gap-2 mb-6 text-gray-700">
        <UserCheck size={16} className="text-primary" />
        <span className="text-sm">Idade mínima: 16 anos</span>
      </div>

      {/* MÉTODO DE HORÁRIO INSERIDO AQUI */}
      <div className="space-y-3 mb-4">
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
            {course.schedule || "Data e horário a definir"}
          </Text>
        </div>
      </div>

      {/* LOCAL / ENDEREÇO */}
      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <MapPin size={16} className="text-primary" />
        <span className="text-sm">Local/Endereço</span>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 border-t pt-4">
        Inscrever-se em {course.title}
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition"
          >
            {course.enrollment?.buttonText || "Inscrever-se"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
