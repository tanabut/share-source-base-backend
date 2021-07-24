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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const sharp_1 = __importStar(require("sharp"));
const config_1 = require("../config");
const SUPPORTED_RESIZABLE_FORMATS = ['jpeg'];
async function resizeImage(imageBuffer, threshold = config_1.MAX_PRODUCT_IMAGE_SIZE) {
    const sharpImage = sharp_1.default(imageBuffer);
    const metadata = await sharpImage.metadata();
    if (!metadata.format ||
        !SUPPORTED_RESIZABLE_FORMATS.includes(metadata.format)) {
        return imageBuffer;
    }
    const isMaximumSizeExceeded = (metadata.width && metadata.width > threshold) ||
        (metadata.height && metadata.height > threshold);
    const outputSharpImage = isMaximumSizeExceeded
        ? sharpImage.resize(threshold, threshold, { fit: 'inside' })
        : sharpImage;
    if (!metadata.format) {
        throw new Error('Missing image format');
    }
    const sharpFormat = sharp_1.format[metadata.format];
    if (!sharpFormat) {
        throw new Error('Format not supported');
    }
    return outputSharpImage.toFormat(sharpFormat).toBuffer();
}
exports.resizeImage = resizeImage;
//# sourceMappingURL=image.js.map