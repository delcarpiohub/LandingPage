import { testimonials } from "../src/lib/testimonials.ts";

const PROHIBITED_PRIVACY_PATTERN = /@|\+56|www\.|http|Av\.|Ruta|\d{7,}/i;

let failures = 0;

function fail(message: string) {
  failures += 1;
  console.error(`✘ ${message}`);
}

if (testimonials.length !== 9) {
  fail(`Se esperaban 9 testimonios y se encontraron ${testimonials.length}.`);
}

for (const testimonial of testimonials) {
  if (testimonial.fullText) {
    const fullText = testimonial.fullText.join(" ");
    if (!fullText.includes(testimonial.quote)) {
      fail(
        `[${testimonial.id}] quote no es un extracto literal de fullText.join(" ").`,
      );
    }
  }

  const fields = {
    quote: testimonial.quote,
    fullText: testimonial.fullText?.join(" ") ?? "",
    name: testimonial.name,
    role: testimonial.role,
    organization: testimonial.organization,
  };

  for (const [field, value] of Object.entries(fields)) {
    if (PROHIBITED_PRIVACY_PATTERN.test(value)) {
      fail(`[${testimonial.id}] ${field} contiene información de contacto prohibida.`);
    }
  }
}

if (failures > 0) {
  console.error(`\n✘ check:testimonios-extractos — ${failures} problema(s) encontrado(s).`);
  process.exit(1);
}

console.log(
  `✓ check:testimonios-extractos — ${testimonials.length} testimonios verificados; extractos literales y sin datos de contacto prohibidos.`,
);
