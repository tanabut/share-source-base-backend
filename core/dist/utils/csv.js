"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkedReadCSVFile = exports.getCSVData = exports.csvToJson = void 0;
/* eslint-disable no-await-in-loop */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv = __importStar(require("fast-csv"));
const get_1 = __importDefault(require("lodash/get"));
const reduce_1 = __importDefault(require("lodash/reduce"));
async function csvToJson(filePath) {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs_1.default.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', (raw) => {
            rows.push(raw);
        })
            .on('end', () => resolve(Object.values(rows)));
    });
}
exports.csvToJson = csvToJson;
// TODO: Handle duplicated function
async function getCSVData(fileName, convert, keys) {
    return new Promise((resolve, reject) => {
        const data = {};
        fs_1.default.createReadStream(path_1.default.resolve(__dirname, `../../temp/${fileName}.csv`))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', (raw) => {
            const value = convert(raw);
            const uniqueKey = reduce_1.default(keys, (acc, key) => `${acc}:${get_1.default(value, key)}`, '');
            data[uniqueKey] = value;
        })
            .on('end', () => resolve(Object.values(data)));
    });
}
exports.getCSVData = getCSVData;
async function parseChunkBuffer(fileHandler, csvHeaders, fromByteIndex, chunkBufferSize, lastRowIndex) {
    let buffer = Buffer.alloc(chunkBufferSize);
    let res = await fileHandler.read(buffer, 0, chunkBufferSize, fromByteIndex);
    if (!res.bytesRead)
        return {
            toByteIndex: 0,
            data: null,
            lastRowIndex,
        };
    let read = 0;
    while (res.bytesRead !== -1 && res.bytesRead) {
        res = await fileHandler.read(buffer, read);
        read += res.bytesRead;
    }
    const lastLine = buffer.lastIndexOf('\n');
    buffer = buffer.slice(0, lastLine + 1);
    const data = buffer.toString();
    let _lastRowIndex = lastRowIndex;
    const _data = await new Promise((resolve, reject) => {
        const _rows = [];
        csv
            .parseString(data, {
            headers: csvHeaders,
        })
            .on('error', error => reject(error))
            .on('data', row => {
            _lastRowIndex += 1;
            _rows.push({
                index: _lastRowIndex,
                row,
            });
        })
            .on('end', () => resolve(_rows));
    });
    return {
        toByteIndex: fromByteIndex + lastLine,
        data: _data,
        lastRowIndex: _lastRowIndex,
    };
}
async function chunkedReadCSVFile(fileName, csvHeaders, chunkBufferSize, handler) {
    const fileHandler = await fs_1.default.promises.open(fileName, 'r');
    let chunkIndex = 0;
    let fromByteIndex = 0;
    let chunkBuffer = null;
    let lastRowIndex = 0;
    do {
        chunkBuffer = await parseChunkBuffer(fileHandler, csvHeaders, fromByteIndex, chunkBufferSize, lastRowIndex);
        fromByteIndex = chunkBuffer.toByteIndex + 1;
        if (chunkBuffer.data && chunkIndex > 0) {
            await handler(chunkBuffer.data);
        }
        chunkIndex += 1;
        lastRowIndex = chunkBuffer.lastRowIndex;
    } while (chunkBuffer.data);
    await fileHandler.close();
}
exports.chunkedReadCSVFile = chunkedReadCSVFile;
//# sourceMappingURL=csv.js.map