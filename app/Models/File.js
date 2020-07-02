'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed(){
    return ['url']

  }

  getUrl({ id }){
    if(Env.get('HOST') =='127.0.0.1' ){
      return `http://127.0.0.1:3000/files/${id}`
    }else{
      return `http://basemor-com.umbler.net/files/${id}`
    }


  }

}

module.exports = File
