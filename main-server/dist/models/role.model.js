var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Table, Model, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserRoleEnum } from "../utils/types/enum/role-enum.js";
import { UserRole } from "./user-role.model.js";
import { User } from "./user.model.js";
let Role = class Role extends Model {
};
__decorate([
    Column({
        type: DataType.ENUM(...Object.values(UserRoleEnum)),
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    BelongsToMany(() => User, {
        through: {
            model: () => UserRole,
        }
    }),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    HasMany(() => UserRole, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Role.prototype, "roleUsers", void 0);
Role = __decorate([
    Table({ timestamps: false, modelName: "Role", tableName: "role", underscored: true })
], Role);
export { Role };
