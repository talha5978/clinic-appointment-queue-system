CREATE TYPE "public"."appointment_status" AS ENUM('booked', 'checked_in', 'completed', 'cancelled', 'no_show');--> statement-breakpoint
CREATE TYPE "public"."queue_entry_status" AS ENUM('waiting', 'called', 'in_consultation', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"appointment_date" date NOT NULL,
	"time_slot" text NOT NULL,
	"status" "appointment_status" DEFAULT 'booked' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultation_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"queue_entry_id" uuid NOT NULL,
	"diagnosis" text,
	"notes" text,
	"prescription" text,
	"duration_minutes" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctor_schedule_overrides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doctor_id" uuid NOT NULL,
	"override_date" date NOT NULL,
	"start_time" time,
	"end_time" time,
	"slot_duration_minutes" integer,
	"is_closed" boolean DEFAULT false,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctor_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doctor_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"slot_duration_minutes" integer DEFAULT 15 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"specialization" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"email" text NOT NULL,
	"cnic" text NOT NULL,
	"date_of_birth" date,
	"gender" text NOT NULL,
	"address" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "patients_phone_unique" UNIQUE("phone"),
	CONSTRAINT "patients_cnic_unique" UNIQUE("cnic")
);
--> statement-breakpoint
CREATE TABLE "queue_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_number" integer NOT NULL,
	"appointment_id" uuid,
	"status" "queue_entry_status" DEFAULT 'waiting' NOT NULL,
	"called_at" timestamp with time zone,
	"consultation_start" timestamp with time zone,
	"consultation_end" timestamp with time zone,
	"queue_date" date DEFAULT now() NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "system_settings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "system_settings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "system_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_logs" ADD CONSTRAINT "consultation_logs_queue_entry_id_queue_entries_id_fk" FOREIGN KEY ("queue_entry_id") REFERENCES "public"."queue_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_schedule_overrides" ADD CONSTRAINT "doctor_schedule_overrides_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_entries" ADD CONSTRAINT "queue_entries_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_entries" ADD CONSTRAINT "queue_entries_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "queue_entries" ADD CONSTRAINT "queue_entries_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE restrict ON UPDATE no action;