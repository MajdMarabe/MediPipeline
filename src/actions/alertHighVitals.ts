export function alertHighVitals(payload: any) {
  const alerts = [];

  if (payload.heartRate > 120) {
    alerts.push('High heart rate');
  }

  if (payload.bloodPressure > 140) {
    alerts.push('High blood pressure');
  }

  return {
    patient: payload.patientName,
    alerts,
    status: alerts.length > 0 ? 'critical' : 'normal',
  };
}
