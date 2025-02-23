var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import PermissionEnum from "../utils/types/enum/permission-enum.js";
import { User } from "./user.model.js";
import { Document } from "./document.model.js";
let DocumentUser = class DocumentUser extends Model {
};
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(PermissionEnum)), //it takes enum as multiple strings
    }),
    __metadata("design:type", String)
], DocumentUser.prototype, "permission", void 0);
__decorate([
    ForeignKey(() => User),
    PrimaryKey,
    Column,
    __metadata("design:type", Number)
], DocumentUser.prototype, "userId", void 0);
__decorate([
    BelongsTo(() => Document),
    __metadata("design:type", Document)
], DocumentUser.prototype, "document", void 0);
__decorate([
    ForeignKey(() => Document),
    PrimaryKey,
    Column,
    __metadata("design:type", Number)
], DocumentUser.prototype, "documentId", void 0);
DocumentUser = __decorate([
    Table({ tableName: "document_user", underscored: true })
], DocumentUser);
export { DocumentUser };
