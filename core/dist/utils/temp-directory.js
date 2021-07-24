"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTempDirectoryPath = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
function getTempDirectoryPath() {
    const tempDownloadDirectory = path_1.default.resolve(config_1.TEMP_DIRECTORY_PATH);
    if (!fs_1.default.existsSync(tempDownloadDirectory)) {
        fs_1.default.mkdirSync(tempDownloadDirectory);
    }
    return tempDownloadDirectory;
}
exports.getTempDirectoryPath = getTempDirectoryPath;
//# sourceMappingURL=temp-directory.js.map