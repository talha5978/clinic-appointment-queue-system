import {
	pgTable,
	uuid,
	text,
	timestamp,
	date,
	time,
	integer,
	boolean,
	jsonb,
	pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ====================== ENUMS ======================

export const appointmentStatusEnum = pgEnum("appointment_status", [
	"booked",
	"checked_in",
	"completed",
	"cancelled",
	"no_show",
]);

export const queueEntryStatusEnum = pgEnum("queue_entry_status", [
	"waiting",
	"called",
	"in_consultation",
	"completed",
	"cancelled",
]);

// ====================== TABLES ======================

export const patients = pgTable("patients", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	phone: text("phone").unique(),
	email: text("email").notNull(),
	cnic: text("cnic").unique().notNull(),
	dateOfBirth: date("date_of_birth"),
	gender: text("gender").notNull(),
	address: text("address"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const doctors = pgTable("doctors", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	image: text("image"),
	description: text("description").notNull(),
	specialization: text("specialization").notNull(),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const appointments = pgTable("appointments", {
	id: uuid("id").primaryKey().defaultRandom(),
	patientId: uuid("patient_id")
		.notNull()
		.references(() => patients.id, { onDelete: "cascade" }),
	doctorId: uuid("doctor_id")
		.notNull()
		.references(() => doctors.id, { onDelete: "restrict" }),
	appointmentDate: date("appointment_date").notNull(),
	timeSlot: text("time_slot").notNull(),
	status: appointmentStatusEnum("status").notNull().default("booked"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const queueEntries = pgTable("queue_entries", {
	id: uuid("id").primaryKey().defaultRandom(),
	tokenNumber: integer("token_number").notNull(),
	appointmentId: uuid("appointment_id").references(() => appointments.id, { onDelete: "set null" }),
	status: queueEntryStatusEnum("status").notNull().default("waiting"),
	calledAt: timestamp("called_at", { withTimezone: true }),
	consultationStart: timestamp("consultation_start", { withTimezone: true }),
	consultationEnd: timestamp("consultation_end", { withTimezone: true }),
	queueDate: date("queue_date").notNull().defaultNow(),
	patientId: uuid("patient_id")
		.notNull()
		.references(() => patients.id, { onDelete: "cascade" }),
	doctorId: uuid("doctor_id")
		.notNull()
		.references(() => doctors.id, { onDelete: "restrict" }),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const consultationLogs = pgTable("consultation_logs", {
	id: uuid("id").primaryKey().defaultRandom(),
	queueEntryId: uuid("queue_entry_id")
		.notNull()
		.references(() => queueEntries.id, { onDelete: "cascade" }),
	diagnosis: text("diagnosis"),
	notes: text("notes"),
	prescription: text("prescription"),
	durationMinutes: integer("duration_minutes"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const doctorSchedules = pgTable("doctor_schedules", {
	id: uuid("id").primaryKey().defaultRandom(),
	doctorId: uuid("doctor_id")
		.notNull()
		.references(() => doctors.id, { onDelete: "cascade" }),
	dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday, 1=Monday, ..., 6=Saturday
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	slotDurationMinutes: integer("slot_duration_minutes").notNull().default(15),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const doctorScheduleOverrides = pgTable("doctor_schedule_overrides", {
	id: uuid("id").primaryKey().defaultRandom(),
	doctorId: uuid("doctor_id")
		.notNull()
		.references(() => doctors.id, { onDelete: "cascade" }),
	overrideDate: date("override_date").notNull(),
	startTime: time("start_time"),
	endTime: time("end_time"),
	slotDurationMinutes: integer("slot_duration_minutes"),
	isClosed: boolean("is_closed").default(false),
	notes: text("notes"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const systemSettings = pgTable("system_settings", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	key: text("key").notNull().unique(),
	value: jsonb("value").notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ====================== RELATIONS ======================

export const patientsRelations = relations(patients, ({ many }) => ({
	appointments: many(appointments),
	queueEntries: many(queueEntries),
}));

export const doctorsRelations = relations(doctors, ({ many }) => ({
	appointments: many(appointments),
	queueEntries: many(queueEntries),
	schedules: many(doctorSchedules),
	overrides: many(doctorScheduleOverrides),
	consultationLogs: many(consultationLogs),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
	patient: one(patients, {
		fields: [appointments.patientId],
		references: [patients.id],
	}),
	doctor: one(doctors, {
		fields: [appointments.doctorId],
		references: [doctors.id],
	}),
	queueEntry: one(queueEntries, {
		fields: [appointments.id],
		references: [queueEntries.appointmentId],
	}),
}));

export const queueEntriesRelations = relations(queueEntries, ({ one }) => ({
	appointment: one(appointments, {
		fields: [queueEntries.appointmentId],
		references: [appointments.id],
	}),
	patient: one(patients, {
		fields: [queueEntries.patientId],
		references: [patients.id],
	}),
	doctor: one(doctors, {
		fields: [queueEntries.doctorId],
		references: [doctors.id],
	}),
	consultationLog: one(consultationLogs, {
		fields: [queueEntries.id],
		references: [consultationLogs.queueEntryId],
	}),
}));

export const consultationLogsRelations = relations(consultationLogs, ({ one }) => ({
	queueEntry: one(queueEntries, {
		fields: [consultationLogs.queueEntryId],
		references: [queueEntries.id],
	}),
}));

export const schema = {
	patients,
	doctors,
	appointments,
	queueEntries,
	consultationLogs,
	doctorSchedules,
	doctorScheduleOverrides,
	systemSettings,
	appointmentStatusEnum,
	queueEntryStatusEnum,
};
