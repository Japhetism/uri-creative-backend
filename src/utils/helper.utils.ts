export const getApplicationsByMonth = (applications: { dateApplied: string }[]) => {
  return applications.reduce((acc, app) => {
    const month = new Date(app.dateApplied).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
}

export const filterApplicationByStatus = (applications, status: string) => {
  return applications.filter((app) => app.status?.toLowerCase() === status?.toLowerCase())
}
  