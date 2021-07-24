"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.parseDate = exports.loadAsJSON = exports.getBuffer = exports.fitToHeaderColumn = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
/**
 * Determines the column size by the length of chars in header column.
 * @param header
 */
function fitToHeaderColumn(header) {
    if (!header || !header.length)
        return [];
    const wscols = [];
    for (let i = 0; i < header.length; i += 1) {
        wscols.push({ wch: header[i].length + 5 });
    }
    return wscols;
}
exports.fitToHeaderColumn = fitToHeaderColumn;
function getBuffer(rows, sheetName = 'sheet1') {
    const ws = xlsx_1.default.utils.aoa_to_sheet(rows);
    ws['!cols'] = fitToHeaderColumn(rows[0]);
    const wb = xlsx_1.default.utils.book_new();
    xlsx_1.default.utils.book_append_sheet(wb, ws, sheetName);
    return xlsx_1.default.write(wb, { type: 'buffer', bookType: 'xlsx' });
}
exports.getBuffer = getBuffer;
function loadAsJSON(file) {
    const wb = xlsx_1.default.readFile(file);
    const data = xlsx_1.default.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    return data;
}
exports.loadAsJSON = loadAsJSON;
function parseDate(dateNumber) {
    return xlsx_1.default.SSF.parse_date_code(dateNumber);
}
exports.parseDate = parseDate;
function formatDate(date, format) {
    switch (format) {
        case 'mm/dd/yyyy':
            return `${date.m}/${date.d}/${date.y}`;
        default:
            return '';
    }
}
exports.formatDate = formatDate;
//# sourceMappingURL=xlsx.js.map