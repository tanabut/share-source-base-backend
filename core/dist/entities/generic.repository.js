"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const chunk_1 = __importDefault(require("lodash/chunk"));
const typeorm_1 = require("typeorm");
const base_repository_1 = require("./base.repository");
let GenericRepository = class GenericRepository extends base_repository_1.BaseRepository {
    async getEntityMapByIds(Entity, ids, key) {
        const entityMap = {};
        const chunkedIds = chunk_1.default(ids, 1000);
        await chunkedIds.reduce(async (cPromise, cIds) => {
            await cPromise;
            const records = await this.manager.find(Entity, {
                where: {
                    [key]: typeorm_1.In(cIds),
                },
            });
            records.reduce((acc, curr) => {
                const id = curr[key];
                if (!id) {
                    return acc;
                }
                acc[id] = curr;
                return acc;
            }, entityMap);
        }, Promise.resolve());
        return entityMap;
    }
};
GenericRepository = __decorate([
    typeorm_1.EntityRepository()
], GenericRepository);
exports.default = GenericRepository;
//# sourceMappingURL=generic.repository.js.map