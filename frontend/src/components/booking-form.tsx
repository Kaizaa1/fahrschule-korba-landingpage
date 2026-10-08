"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { cloneElement, useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { drivingClasses, team } from "@/content/site";
import { bookingSchema, type BookingFormValues } from "@/lib/booking-schema";

const contactMethods = ["WhatsApp", "Telefon", "E-Mail"];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      drivingClass: "",
      instructor: "egal",
      contactMethod: "",
      name: "",
      contact: "",
      desiredDate: "",
      message: "",
    },
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <Field label="Führerscheinklasse" error={errors.drivingClass?.message}>
          <select id="drivingClass" {...register("drivingClass")}>
            <option value="">Bitte auswählen</option>
            {drivingClasses.slice(0, 4).map((entry) => (
              <option key={entry.name} value={entry.name === "Klasse B" ? "B" : entry.name}>
                {entry.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Fahrlehrer oder Fahrlehrerin" error={errors.instructor?.message}>
          <select id="instructor" {...register("instructor")}>
            <option value="egal">Egal, Hauptsache passend</option>
            {team.map((member) => (
              <option key={member.name} value={member.name}>{member.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Kontaktweg" error={errors.contactMethod?.message}>
          <select id="contactMethod" {...register("contactMethod")}>
            <option value="">Bitte auswählen</option>
            {contactMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </Field>

        <Field label="Name" error={errors.name?.message}>
          <input id="name" autoComplete="name" {...register("name")} />
        </Field>

        <Field label="E-Mail oder Telefonnummer" error={errors.contact?.message}>
          <input id="contact" autoComplete="email" {...register("contact")} />
        </Field>

        <Field label="Wunschtermin oder Zeitfenster" error={errors.desiredDate?.message}>
          <input id="desiredDate" placeholder="Zum Beispiel Dienstag ab 16 Uhr" {...register("desiredDate")} />
        </Field>
      </div>

      <Field label="Nachricht" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Was möchtest du klären?"
          {...register("message")}
        />
      </Field>

      <div className="form-submit-row">
        <button className="button button-accent" type="submit">
          Anfrage vorbereiten
          <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
        </button>
        <p>Demo-Formular: Die Eingaben werden nicht gespeichert oder versendet.</p>
      </div>

      {submitted ? (
        <div className="form-success" role="status">
          <CheckCircle size={22} weight="fill" aria-hidden="true" />
          <span>Demo-Anfrage vorbereitet. Es wurden keine Daten versendet.</span>
        </div>
      ) : null}
    </form>
  );
}

type FieldControlProps = {
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

type FieldProps = {
  label: string;
  error?: string;
  children: ReactElement<FieldControlProps>;
};

function Field({ label, error, children }: FieldProps) {
  const id = children.props.id;
  const errorId = id ? `${id}-error` : undefined;
  const control = cloneElement(children, {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  });

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {control}
      {error ? <p id={errorId} className="form-error">{error}</p> : null}
    </div>
  );
}
