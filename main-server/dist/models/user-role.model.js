var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Table, PrimaryKey, BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Role } from "./role.model.js";
import { User } from "./user.model.js";
let UserRole = class UserRole extends Model {
};
__decorate([
    ForeignKey(() => User),
    PrimaryKey,
    Column,
    __metadata("design:type", Number)
], UserRole.prototype, "userId", void 0);
__decorate([
    BelongsTo(() => Role),
    __metadata("design:type", Role)
], UserRole.prototype, "role", void 0);
__decorate([
    ForeignKey(() => Role),
    PrimaryKey,
    Column,
    __metadata("design:type", Number)
], UserRole.prototype, "roleId", void 0);
UserRole = __decorate([
    Table({ tableName: "user_role", underscored: true })
], UserRole);
export { UserRole };
