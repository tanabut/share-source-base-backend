import xlsx from 'xlsx';

/**
 * Determines the column size by the length of chars in header column.
 * @param header
 */
export function fitToHeaderColumn(header: string[]) {
  if (!header || !header.length) return [];

  const wscols = [];

  for (let i = 0; i < header.length; i += 1) {
    wscols.push({ wch: header[i]!.length + 5 });
  }

  return wscols;
}

export function getBuffer(rows: string[][], sheetName = 'sheet1') {
  const ws = xlsx.utils.aoa_to_sheet(rows);
  ws['!cols'] = fitToHeaderColumn(rows[0] as string[]);

  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, sheetName);

  return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

export function loadAsJSON(file: string) {
  const wb = xlsx.readFile(file);
  const data = xlsx.utils.sheet_to_json(
    wb.Sheets[wb.SheetNames[0] as string] as xlsx.WorkSheet,
  );

  return data;
}

export function parseDate(dateNumber: number) {
  return xlsx.SSF.parse_date_code(dateNumber);
}

export function formatDate(date: xlsx.SSF.SSF$Date, format: string) {
  switch (format) {
    case 'mm/dd/yyyy':
      return `${date.m}/${date.d}/${date.y}`;
    default:
      return '';
  }
}
