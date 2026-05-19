"use client";

import { useState } from "react";
import { Course } from "@/sanity/lib/types/course";

type MonthlyOption = NonNullable<Course["monthlyOptions"]>[number];

interface EnrollmentPricingSelectorProps {
  options: MonthlyOption[];
  onSelect?: (option: MonthlyOption) => void;
  defaultIndex?: number;
}

export function EnrollmentPricingSelector({
  options,
  onSelect,
  defaultIndex = 0,
}: EnrollmentPricingSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(defaultIndex, Math.max(options.length - 1, 0)),
  );

  if (!options.length) {
    return null;
  }

  const formatPrice = (option: MonthlyOption) => {
    if (option.free) {
      return "Gratuito";
    }

    if (typeof option.price === "number") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(option.price);
    }

    return "Valor sob consulta";
  };

  return (
    <fieldset className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
      <legend className="px-1 text-sm font-semibold uppercase tracking-wide text-gray-600">
        Selecione a modalidade
      </legend>
      <div className="space-y-3">
        {options.map((option, index) => {
          const id = `course-pricing-${index}`;
          const checked = index === selectedIndex;

          return (
            <label
              key={id}
              htmlFor={id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 transition-colors hover:border-primary"
            >
              <input
                id={id}
                type="radio"
                name="course-pricing"
                checked={checked}
                onChange={() => {
                  setSelectedIndex(index);
                  onSelect?.(option);
                }}
                className="mt-1"
              />
              <span className="flex-1">
                <span className="block font-semibold text-gray-900">
                  {option.title}
                </span>
                {option.details && (
                  <span className="block text-sm text-gray-500">{option.details}</span>
                )}
              </span>
              <span className="text-sm font-semibold text-primary whitespace-nowrap">
                {formatPrice(option)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}