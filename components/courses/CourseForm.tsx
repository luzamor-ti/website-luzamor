"use client";
import { Course } from "@/sanity/lib/types/course";
import { motion } from "framer-motion";
import { Text } from "../ui";
import { Calendar, Ticket, UserCheck } from "lucide-react";
import { CourseEnrollmentForm } from "./CourseEnrollmentForm";

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

  return (
    <motion.div
      id="course-form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl bg-white border-gray-100"
    >
      {/* Informações de Preço */}
      {course.monthlyOptions && course.monthlyOptions.length > 0 && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Ticket size={24} className="text-primary" />
            <Text
              variant="small"
              className="text-gray-600 uppercase font-bold tracking-wide"
            >
              Valor de investimento
            </Text>
          </div>
          <div className="space-y-3">
            {course.monthlyOptions.map((opt, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{opt.title}</p>
                  {opt.details && <p className="text-xs text-gray-500 mt-0.5">{opt.details}</p>}
                </div>
                <Text
                  variant="small"
                  className="font-bold text-primary tracking-wide ml-4 whitespace-nowrap"
                >
                  {opt.free ? "Gratuito" : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(opt.price || 0)}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detalhes do Curso */}
      <div className="space-y-4 mb-6">
        {course.minAge && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <UserCheck size={16} className="text-primary" />
              <Text
                variant="small"
                className="text-gray-500 uppercase font-semibold"
              >
                Idade mínima
              </Text>
            </div>
            <Text className="italic text-gray-700">
              {course.minAge} anos
            </Text>
          </div>
        )}
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

      <CourseEnrollmentForm
        title={course.title}
        buttonText={course.enrollment?.buttonText}
        messageText={course.enrollment?.messageText}
        whatsappNumber={whatsappNumber}
        globalWhatsapp={globalWhatsapp}
      />
    </motion.div>
  );
}
