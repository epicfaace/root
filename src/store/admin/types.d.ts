export interface LiveStats {
  numDevices: number;
  numSubscriptions: number;
  events: Array<{ id: string; name: string; numSubscriptions: number }>;
}

export interface IAdminState {
  applicationList: any[],
  exportedApplications: any[],
  applicationEmails: string[],
  pages: any[],
  applicationStats: {[x: string]: any},
  liveStats: LiveStats,
  liveNotification: {
    title: string,
    body: string
  },
  selectedForm: {
    id: string,
    name: string
  },
  bulkChange: {
    status: string,
    ids: string
  },
  bulkCreate: {
    group: string,
    emails: string,
    password: string
  },
  bulkImportHacks: string,
  bulkImportHacksFloor: number
}