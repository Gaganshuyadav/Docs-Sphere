

/*Associations Representation */
/*

// User
User.hasMany(RefreshToken, { onDelete: 'CASCADE' });
User.belongsToMany(Role, { through: UserRole });
User.hasMany(UserRole, { onDelete: 'CASCADE' });
User.hasMany(DocumentUser , { onDelete: 'CASCADE' });



// UserRole
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });



// Role
Role.belongsToMany(User, { through: UserRole });
Role.hasMany(UserRole, { onDelete: 'CASCADE' });


// RefreshToken
RefreshToken.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });


// Document
Document.belongsTo(User, { foreignKey: 'userId' });
Document.hasMany(DocumentUser , { onDelete: 'CASCADE' });


// DocumentUser
DocumentUser.belongsTo(User, { foreignKey: 'userId' });
DocumentUser.belongsTo(Document, { foreignKey: 'documentId' });


*/