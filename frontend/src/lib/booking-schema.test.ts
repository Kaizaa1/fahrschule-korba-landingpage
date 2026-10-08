import { describe, expect, it } from "vitest";
import { bookingSchema } from "./booking-schema";

const validBooking = {
  drivingClass: "B197",
  instructor: "egal",
  contactMethod: "E-Mail",
  name: "Qaiser Barto",
  contact: "qaiser@example.de",
  desiredDate: "Nachmittags unter der Woche",
  message: "Ich möchte mich zu B197 beraten lassen.",
};

describe("bookingSchema", () => {
  it("accepts a complete booking request", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("requires a driving class and contact method", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      drivingClass: "",
      contactMethod: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid email when email is selected", () => {
    const result = bookingSchema.safeParse({ ...validBooking, contact: "keine-email" });
    expect(result.success).toBe(false);
  });

  it("accepts an optional instructor preference", () => {
    const result = bookingSchema.safeParse({ ...validBooking, instructor: "Mara Özdemir" });
    expect(result.success).toBe(true);
  });

  it("accepts a desired time without an additional message", () => {
    const result = bookingSchema.safeParse({ ...validBooking, message: "" });
    expect(result.success).toBe(true);
  });

  it("requires either a desired time or a message", () => {
    const result = bookingSchema.safeParse({ ...validBooking, desiredDate: "", message: "" });
    expect(result.success).toBe(false);
  });
});
