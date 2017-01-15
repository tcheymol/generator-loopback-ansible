const admin = {
  email: 'admin@<%= appName %>.com',
  password: '<%= appName %>',
  birthDate: new Date(),
};

module.exports = (server) => {
  const models = server.models;

  return models.user.findOrCreate(
    { where: { email: admin.email } },
    admin
  )
  .then(user => Promise.props({
    user,
    role: models.Role.findOrCreate(
      { where: { name: 'admin' } },
      { name: 'admin' }
    )
  }))
  .then(({ user, role }) => role.principals.create({
    principalType: models.RoleMapping.USER,
    principalId: user.id,
  }))
  .then(principal => console.log(principal))
  .catch(err => console.log('%j', err));
};
