import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { schema } from "./schema";

const {
	doctors,
	patients,
	appointments,
	queueEntries,
	consultationLogs,
	doctorSchedules,
	doctorScheduleOverrides,
	systemSettings,
} = schema;

export type Doctor = InferSelectModel<typeof doctors>;
export type Patient = InferSelectModel<typeof patients>;
export type Appointment = InferSelectModel<typeof appointments>;
export type QueueEntry = InferSelectModel<typeof queueEntries>;
export type ConsultationLog = InferSelectModel<typeof consultationLogs>;
export type DoctorSchedule = InferSelectModel<typeof doctorSchedules>;
export type DoctorScheduleOverride = InferSelectModel<typeof doctorScheduleOverrides>;
export type SystemSetting = InferSelectModel<typeof systemSettings>;

export type DoctorInsert = InferInsertModel<typeof doctors>;
export type PatientInsert = InferInsertModel<typeof patients>;
export type AppointmentInsert = InferInsertModel<typeof appointments>;
export type QueueEntryInsert = InferInsertModel<typeof queueEntries>;
export type ConsultationLogInsert = InferInsertModel<typeof consultationLogs>;
export type DoctorScheduleInsert = InferInsertModel<typeof doctorSchedules>;
export type DoctorScheduleOverrideInsert = InferInsertModel<typeof doctorScheduleOverrides>;
export type SystemSettingInsert = InferInsertModel<typeof systemSettings>;
