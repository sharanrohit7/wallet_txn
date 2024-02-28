export function getDateRange(): { startDate: string, endDate: string } {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const startDate = formatDate(today);
    const endDate = formatDate(yesterday);

    return { startDate, endDate };
}

function formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}-${day}-${year}`;
}


export async function checkDateValidity(fromDate: string, toDate: string): Promise<boolean> {
    const fromDateParts = fromDate.split('-').map(Number);
    const toDateParts = toDate.split('-').map(Number);

    // Create Date objects for comparison
    const fromDateObject = new Date(fromDateParts[2], fromDateParts[0] - 1, fromDateParts[1]);
    const toDateObject = new Date(toDateParts[2], toDateParts[0] - 1, toDateParts[1]);

    // Check if fromDate is greater than toDate
    if (fromDateObject.getTime() > toDateObject.getTime()) {
        return false;
    }

    return true;
}