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

export interface DriverDashboardAnalytics {
  trips: {
    total: number;
    completed: number;
    cancelled: number;
    inProgress: number;
  };
  dispatches: {
    total: number;
    pending: number;
    accepted: number;
    completed: number;
    rejected: number;
  };
  earnings: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    pending: number;
  };
  performance: {
    rating: number;
    totalRatings: number;
    acceptanceRate: number;
    completionRate: number;
  };
}

export interface CallerDashboardAnalytics {
  emergencies: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  trips: {
    total: number;
    completed: number;
  };
  payments: {
    totalSpending: number;
    completedPayments: number;
    pendingPayments: number;
  };
}
