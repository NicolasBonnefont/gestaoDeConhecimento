
const Model = use('Model')
const Hash = use('Hash')


class Usuario extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.senha) {
        userInstance.senha = await Hash.make(userInstance.senha)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }


  }


module.exports = Usuario