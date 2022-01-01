import { Favorite } from './model'

export const countFavorite = (favorites:Array<Favorite>,postId:string)=>{
  return favorites.filter((v)=>{
    return v.postId === postId
  }).length
}

export const isFavorite=(favorites:Array<Favorite>,postId:string,userId:string)=>{
  return favorites.some((favorite)=>{
    return favorite.postId===postId && favorite.userId===userId
  })
}
