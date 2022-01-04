import { getFirestore,collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { User , Post , Favorite  } from "./model";

export const createUserFirebase=async(name:string)=>{
  console.log(name)
  return addDoc(collection(getFirestore(), "users"), {
    name: name,
  })
  .then(()=>{
    return
  })
  .catch(()=>{
    alert('fail')
  })
}
export const createPostFirebase=async(post:string,userId:string,userName:string)=>{
  return addDoc(collection(getFirestore(), "posts"), {
    post,
    userId,
    userName
  })
  .then(()=>{
    return fetchPostsFirebase()
  })
  .catch(()=>{
    alert('fail')
  })
}

export const addFavoriteFirebase = async(postId:string,userId:string)=>{
  addDoc(collection(getFirestore(), "favorites"), {
    postId,
    userId
  })
  .then(()=>{
  })
  .catch(()=>{
    alert('fail')
  })
}

export const deleteUserFirebase =async (userId:string , userPosts:Array<any> , favorites:Array<Favorite>) =>{
  await deleteDoc(doc(getFirestore(),"users",userId))
  await userPosts.forEach((v)=>{
    if(v.userId === userId){
      deleteDoc(doc(getFirestore(),"posts",v.postId))
    }    
  })
  const deletePosts = userPosts.filter((v)=>{
    return v.userId === userId
  })
  await favorites.forEach((v:Favorite)=>{
    deletePosts.forEach((post)=>{
      if( v.postId === post.postId ){
        deleteDoc(doc(getFirestore(),"favorites" ,v.favoriteId))
      }  
    })
  })
  return
}

export const deleteFavoriteFirebase = async(favoriteId:string)=>{
  deleteDoc(doc(getFirestore(), "favorites",favoriteId))
}

export const deletePostFirebase = async(postId:string,favorites:Array<Favorite>)=>{
  await deleteDoc(doc(getFirestore(), "posts",postId))
  favorites.forEach((v)=>{
    if(v.postId === postId){
      deleteDoc(doc(getFirestore(),"favorites",v.favoriteId))
    }
  })
}

export const fetchUsersFirebase = async():Promise<User[]>=>{
  const users:Array<User>=[]
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));
  querySnapshot.forEach((doc) => {
    users.push({
      id:doc.id,
      name:doc.data().name
    })
  })
  return users
}

export const fetchPostsFirebase=async():Promise<Post[]>=>{

  const posts:Array<Post> = []
  const querySnapshot = await getDocs(collection(getFirestore(), "posts"));
  querySnapshot.forEach((doc) => {
    posts.push({
      id:doc.id,
      userId:doc.data().userId,
      userName:doc.data().userName,
      memo:doc.data().post
    })
  });
  return posts
}

export const fetchFavoritesFirebase=async():Promise<Favorite[]>=>{
  const favorites:Array<Favorite> = []
  const querySnapshot = await getDocs(collection(getFirestore(), "favorites"));
  querySnapshot.forEach((doc) => {
    favorites.push({
      favoriteId:doc.id,
      userId:doc.data().userId,
      postId:doc.data().postId
    })
  });
  return favorites
}

export const fetchAllFirebase = async():Promise<any>=>{
  const users:Array<User>=[]
  const querySnapshot1 = await getDocs(collection(getFirestore(), "users"));
  querySnapshot1.forEach((doc) => {
    users.push({
      id:doc.id,
      name:doc.data().name
    })
  });

  const posts:Array<Post> = []
  const querySnapshot2 = await getDocs(collection(getFirestore(), "posts"));
  querySnapshot2.forEach((doc) => {
    posts.push({
      id:doc.id,
      userId:doc.data().userId,
      userName:doc.data().userName,
      memo:doc.data().post
    })
  });

  const favorites:Array<Favorite> = []
  const querySnapshot3 = await getDocs(collection(getFirestore(), "favorites"));
  querySnapshot3.forEach((doc) => {
    favorites.push({
      favoriteId:doc.id,
      userId:doc.data().userId,
      postId:doc.data().postId
    })
  });

  return { users,posts,favorites }

}
