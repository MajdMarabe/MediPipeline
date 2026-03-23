export function labResultReceived(payload: any) {
  const { patientName, test, value, unit } = payload;

  return {
    type: 'lab_result_received',
    message: `Lab result for ${patientName}: ${test} = ${value} ${unit}`,
    data: {
      patient: patientName,
      test,
      value,
      unit,
    },
    receivedAt: new Date(),
  };
}
