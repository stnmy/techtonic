export interface AdminOrderBrowserParams {
    status?: string; // string or undefined (no null)
    period?: string;
    search?: string;
    pageNumber: number;
    pageSize: number;
}