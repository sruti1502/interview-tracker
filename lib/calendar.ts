import { format } from "date-fns";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
}

export function convertApplicationsToEvents(
  applications: any[]
): CalendarEvent[] {
  return applications
    .filter((app : any) => app.interviewDate)
    .map((app : any) => ({
      id: app.id,
      title: `${app.company} - ${app.role}`,
      start: new Date(app.interviewDate),
      end: new Date(app.interviewDate),
      status: app.status,
    }));
}

export function formatInterviewDate(date: Date) {
  return format(date, "dd MMM yyyy");
}