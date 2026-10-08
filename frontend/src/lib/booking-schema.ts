import { z } from "zod";

export const bookingSchema = z
  .object({
    drivingClass: z.string().min(1, "Bitte wähle eine Führerscheinklasse aus."),
    instructor: z.string().default("egal"),
    contactMethod: z.string().min(1, "Bitte wähle einen Kontaktweg aus."),
    name: z.string().trim().min(2, "Bitte gib deinen Namen ein."),
    contact: z.string().trim().min(5, "Bitte gib eine E-Mail-Adresse oder Telefonnummer ein."),
    desiredDate: z.string().trim().optional(),
    message: z.string().trim().optional(),
  })
  .superRefine((data, context) => {
    if (!data.desiredDate && !data.message) {
      context.addIssue({
        code: "custom",
        path: ["message"],
        message: "Bitte gib einen Wunschtermin oder eine Nachricht ein.",
      });
    } else if (data.message && data.message.length < 10) {
      context.addIssue({
        code: "custom",
        path: ["message"],
        message: "Bitte beschreibe dein Anliegen in mindestens 10 Zeichen.",
      });
    }

    if (data.contactMethod === "E-Mail") {
      const email = z.string().email().safeParse(data.contact);
      if (!email.success) {
        context.addIssue({
          code: "custom",
          path: ["contact"],
          message: "Bitte gib eine gültige E-Mail-Adresse ein.",
        });
      }
    }
  });

export type BookingFormValues = z.input<typeof bookingSchema>;
