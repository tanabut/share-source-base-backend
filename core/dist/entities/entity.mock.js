"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockEntityBase = void 0;
function generateMockEntityBase() {
    const mockDate = new Date('2020-01-01');
    return {
        createdAt: mockDate,
        updatedAt: mockDate,
    };
}
exports.generateMockEntityBase = generateMockEntityBase;
//# sourceMappingURL=entity.mock.js.map