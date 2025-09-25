export interface JobTip {
  id: string | number;
  title: string;
  description: string;
}

export interface ReportReason {
  reason: string;
}

export interface ReportItem {
  jobId: string;
  category?: string;
  subCategories?: string[];
  icon?: string;
  reportReasons?: {
    reportingServiceProvider?: string;
    reportingClient?: string;
    jobReports?: { id: string | number; reason: string }[];
  };
  jobTips?: JobTip[];
}
