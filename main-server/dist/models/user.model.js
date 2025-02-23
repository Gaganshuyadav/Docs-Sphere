var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, DataType, Model, HasMany, BelongsToMany, Scopes } from "sequelize-typescript";
import { RefreshToken } from "./refresh-token.model.js";
import { UserRole } from "./user-role.model.js";
import { DocumentUser } from "./document-user.model.js";
import { Role } from "./role.model.js";
import { Document } from "./document.model.js";
let User = class User extends Model {
};
__decorate([
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
__decorate([
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    HasMany(() => RefreshToken, {
        onDelete: 'CASCADE'
    })
    // refreshTokens!: Array<RefreshToken>
    ,
    __metadata("design:type", Array)
], User.prototype, "refreshTokens", void 0);
__decorate([
    BelongsToMany(() => Role, {
        through: {
            model: () => UserRole
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    HasMany(() => UserRole, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "userRoles", void 0);
__decorate([
    BelongsToMany(() => Document, {
        through: {
            model: () => DocumentUser
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "documents", void 0);
__decorate([
    HasMany(() => DocumentUser, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "sharedDocuments", void 0);
User = __decorate([
    Scopes(() => ({
        withRoles: {
            include: [
                {
                    model: UserRole,
                    attributes: ["createdAt", "updatedAt"],
                    include: [Role],
                }
            ]
        }
    })),
    Table({
        timestamps: true,
        modelName: "User",
        tableName: "user",
        underscored: true //Sequelize will automatically convert camelCase property names in your model to snake_case column names in the database.
    })
], User);
export { User };
