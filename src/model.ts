export type User={
  id:string,
  name:string
}


export interface Favorite{
  favoriteId : string
  userId : string,
  postId : string
}

export interface Post{
  id : string,
  userId : string,
  userName : string,
  memo : string
}

export interface UserPost{
  postId : string,
  memo : string,
  userId : string,
  userName : string,
  countFavorite : number,
  isFavorite : boolean
}

