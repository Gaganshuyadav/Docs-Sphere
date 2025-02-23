var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, DataType, Default, ForeignKey, Table, HasMany, BelongsToMany, Model, Scopes } from "sequelize-typescript";
import { DocumentUser } from "./document-user.model.js";
import { User } from "./user.model.js";
let Document = class Document extends Model {
};
__decorate([
    Column(DataType.STRING),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.JSONB
    }),
    __metadata("design:type", String)
], Document.prototype, "content", void 0);
__decorate([
    ForeignKey(() => User),
    Column,
    __metadata("design:type", Number)
], Document.prototype, "userId", void 0);
__decorate([
    BelongsToMany(() => User, {
        through: {
            model: () => DocumentUser,
        }
    }),
    __metadata("design:type", Array)
], Document.prototype, "users", void 0);
__decorate([
    HasMany(() => DocumentUser, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Document.prototype, "sharedDocuments", void 0);
__decorate([
    Default(false),
    Column(DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Document.prototype, "isPublic", void 0);
Document = __decorate([
    Scopes(() => ({
        withUsers: {
            include: [
                {
                    model: DocumentUser,
                    include: [
                        {
                            model: User,
                            attributes: ["email"],
                        }
                    ]
                }
            ]
        }
    })),
    Table({ timestamps: true, tableName: "document", underscored: true })
], Document);
export { Document };
