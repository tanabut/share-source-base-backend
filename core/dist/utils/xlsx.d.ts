import xlsx from 'xlsx';
/**
 * Determines the column size by the length of chars in header column.
 * @param header
 */
export declare function fitToHeaderColumn(header: string[]): {
    wch: number;
}[];
export declare function getBuffer(rows: string[][], sheetName?: string): any;
export declare function loadAsJSON(file: string): unknown[];
export declare function parseDate(dateNumber: number): xlsx.SSF.SSF$Date;
export declare function formatDate(date: xlsx.SSF.SSF$Date, format: string): string;
//# sourceMappingURL=xlsx.d.ts.map