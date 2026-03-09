"use client";

import { Project } from "@/sanity/lib/types/project";
import { Heading } from "@/components/ui";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { CalendarDays } from "lucide-react";
import { EventCard } from "../ui/EventCard";

interface ProjectEventsProps {
  project: Project;
}

export function ProjectEvents({ project }: ProjectEventsProps) {
  if (!project.events || project.events.length === 0) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainerVariants}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <CalendarDays size={24} className="text-primary" />
        <Heading level={3} className="text-gray-800">
          Eventos do Projeto
        </Heading>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {project.events.map((event, index) => (
          <EventCard key={event._id} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
