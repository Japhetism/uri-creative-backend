"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterApplicationByStatus = exports.getApplicationsByMonth = void 0;
const getApplicationsByMonth = (applications) => {
    return applications.reduce((acc, app) => {
        const month = new Date(app.dateApplied).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
};
exports.getApplicationsByMonth = getApplicationsByMonth;
const filterApplicationByStatus = (applications, status) => {
    return applications.filter((app) => app.status?.toLowerCase() === status?.toLowerCase());
};
exports.filterApplicationByStatus = filterApplicationByStatus;
//# sourceMappingURL=helper.utils.js.map