"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const chunk_1 = __importDefault(require("lodash/chunk"));
const typeorm_1 = require("typeorm");
const array_1 = require("../utils/array");
const sql_1 = require("../utils/sql");
let BaseRepository = class BaseRepository {
    constructor(manager) {
        this.manager = manager;
        this.manager = manager;
    }
    async saveOrUpdateRelated(Entity, attrs = []) {
        const newEntities = attrs
            .filter(entity => entity.__state === 'new')
            .map(({ __state, id, ...entityAttr }) => entityAttr);
        const editedEntities = attrs
            .filter(entity => entity.__state === 'edited')
            .map(({ __state, ...entityAttr }) => entityAttr);
        if (newEntities.length) {
            await this.manager.insert(Entity, newEntities);
        }
        if (editedEntities.length) {
            await Promise.all(editedEntities.map(entity => this.manager.update(Entity, { id: entity.id }, entity)));
        }
    }
    // TODO : Make parameters more semantic and easier to manage
    async _upsert(Entity, attrs, { onConflictUniqueFields, excludeOnConflictSetFields = onConflictUniqueFields, extraOnConflictSetFields = [], onConflictSetFields: _onConflictSetFields, uniqueIdentifierCombination, }) {
        if (!attrs.length) {
            return [];
        }
        const onConflictSetFields = (_onConflictSetFields ||
            Object.keys(attrs[0]).filter(field => ![...excludeOnConflictSetFields, 'id'].includes(field))).concat(extraOnConflictSetFields);
        const onConflictSetQueryString = sql_1.generateConflictSetValueString(onConflictSetFields);
        const dedupAttrs = array_1.uniqueMap(attrs, uniqueIdentifierCombination || onConflictUniqueFields);
        const chunkedAttrs = chunk_1.default(dedupAttrs, 1000);
        let identifiers = [];
        const onConflictFieldQuery = onConflictUniqueFields.reduce((acc, f, i) => {
            return `${acc}"${f}" ${i < onConflictUniqueFields.length - 1 ? ',' : ''}`;
        }, '');
        const onConflictDoQuery = `DO ${onConflictSetQueryString && onConflictSetQueryString.length
            ? `UPDATE SET ${onConflictSetQueryString}`
            : 'NOTHING'}`;
        await chunkedAttrs.reduce(async (cPromise, cAttrs) => {
            await cPromise;
            const query = this.manager
                .createQueryBuilder()
                .insert()
                .into(Entity)
                .values(cAttrs.map((attr) => {
                attr.updatedAt = new Date();
                return attr;
            }))
                .onConflict(`( ${onConflictFieldQuery} ) ${onConflictDoQuery}`);
            const res = await query.execute();
            identifiers = identifiers.concat(res.identifiers);
        }, Promise.resolve());
        return identifiers;
    }
};
BaseRepository = __decorate([
    typeorm_1.EntityRepository(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map