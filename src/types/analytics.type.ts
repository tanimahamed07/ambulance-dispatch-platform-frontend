export interface AdminDashboardAnalytics {
  users: {
    total: number;
    admins: number;
    dispatchers: number;
    drivers: number;
    callers: number;
  };
  emergencies: {
    total: number;
    pending: number;
    completed: number;
  };
  ambulances: {
    total: number;
    available: number;
    onTrip: number;
  };
  drivers: {
    approved: number;
    pendingApplications: number;
  };
  revenue: {
    total: number;
    completedPayments: number;
  };
}

export interface DispatcherDashboardAnalytics {
  emergencies: {
    total: number;
    pending: number;
    assigned: number;
    completed: number;
  };
  dispatches: {
    total: number;
    pending: number;
    accepted: number;
    completed: number;
  };
  resources: {
    availableAmbulances: number;
    availableDrivers: number;
    dispatchableDrivers: number;
  };
}
