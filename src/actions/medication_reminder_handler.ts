export function medicationReminderHandler(payload: any) {
  const { patientName, medication, time } = payload;

  return {
    type: "medication_reminder",
    message: `Reminder: ${patientName} should take ${medication} at ${time}`,
    patient: patientName,
    medication,
    scheduledTime: time,
    createdAt: new Date(),
  };
}