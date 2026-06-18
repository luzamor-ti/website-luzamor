"use client";

import { Course } from "@/sanity/lib/types/course";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { GlobalConfiguration } from "@/sanity/lib/types/configuration";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import {
  Section,
  SectionHeader,
  Button,
  Grid,
  SectionFooter,
} from "@/components/ui";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Clock } from "lucide-react";
import { useState } from "react";
import { routesPath } from "@/constants/routesPath";

interface CoursesSectionProps {
  data: Course[];
  section: HomeSection | null;
  config: GlobalConfiguration | null;
}

interface EnrollmentModalProps {
  course: Course;
  whatsappNumber: string;
  onClose: () => void;
}

function EnrollmentModal({
  course,
  whatsappNumber,
  onClose,
}: EnrollmentModalProps) {
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
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
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
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition"
            >
              {course.enrollment.buttonText || "Inscrever-se"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function CoursesSection({ data, section, config }: CoursesSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.courses;
  const globalWhatsapp = config?.contact?.whatsapp;

  const handleEnroll = (course: Course) => {
    if (!course.enrollment.active) return;
    setSelectedCourse(course);
  };

  return (
    <>
      <Section>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            tag={section?.tag || fallback.tag}
            title={section?.title || fallback.title}
            description={section?.description || fallback.description}
            align="left"
            layout="split"
          />

          <Grid cols={3} className="gap-6 md:gap-8">
            {data.slice(0, 3).map((course) => {
              return (
                <motion.div
                  key={course._id}
                  variants={staggerItemVariants}
                  className="group"
                >
                  <Link
                    href={routesPath.course(course.slug)}
                    className="block h-full"
                  >
                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
                      {/* Cover Photo */}
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <Image
                          src={buildSanityImageUrl(
                            course.coverPhoto.asset._ref,
                          )}
                          alt={course.coverPhoto.alt || course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-secondary/20 to-transparent" />
                      </div>

                      <div className="p-5 md:p-6 space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>

                        {(course.schedule || course.requireScheduling) && (
                          <div className="flex items-start gap-2 text-gray-500 mb-6">
                            <Clock className="w-5 h-5 text-[#00b341] shrink-0 mt-[2px]" />
                            <div className="flex flex-col">
                              {course.schedule && (
                                <span className="text-base font-medium">
                                  {course.schedule}
                                </span>
                              )}
                              {course.requireScheduling && (
                                <span className="text-sm font-medium mt-0.5">
                                  Aulas mediante agendamento e disponibilidade
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {course.enrollment.active && (
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <Button
                              onClick={() => handleEnroll(course)}
                              className="w-full"
                              variant="primary"
                            >
                              {course.enrollment.buttonText ||
                                "Inscreva-se agora"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </Grid>

          {data.length > 3 && (
            <SectionFooter
              text={""}
              linkHref="/cursos"
              linkText="Ver todos os cursos"
            />
          )}
        </motion.div>
      </Section>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
          whatsappNumber={
            selectedCourse.enrollment.whatsapp || globalWhatsapp || ""
          }
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}
