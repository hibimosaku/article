import { fetchUsersFirebase,fetchPostsFirebase,fetchFavoritesFirebase,deleteUserFirebase ,createUserFirebase } from './firebase.repository'
import { countFavorite , isFavorite } from './useFavorite'
import { User , Favorite, Post, UserPost} from './model'

export const load = async (users:Array<User>,posts:Array<Post>,favorites:Array<Favorite>,userPosts:Array<UserPost>,loginUserId:string) =>{
  users = await fetchUsersFirebase()
  posts = await fetchPostsFirebase()
  favorites = await fetchFavoritesFirebase()
  userPosts=await []
  await posts.forEach((post)=>{
    userPosts.push({
      postId : post.id,
      memo : post.memo,
      userId : post.userId,
      userName : post.userName,
      countFavorite : countFavorite(favorites,post.id),
      isFavorite : isFavorite(favorites,post.id,loginUserId)
    })
  })
  return {
    users,
    posts,
    favorites,
    userPosts
   }
}