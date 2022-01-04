<template>
<div class="container">
  <h1>投稿アプリ</h1>
  <hr>
  <user
    :users="users"
    @deleteUser="deleteUser"
    @createUser="createUser"
  ></user>
  <hr>
  <post
    :users="users"
    :userPosts="userPosts"
    @CreatePost="CreatePost"
  ></post>
  <hr>
  <list
    :userPosts="userPosts"
    :favorites="favorites"
    :users="users"
    @changeLoginUserId="changeLoginUserId"
    @doFavorite="doFavorite"
    @deletePost="deletePost"

  ></list>
</div>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue'
import { deleteUserFirebase ,createUserFirebase, createPostFirebase, deletePostFirebase, deleteFavoriteFirebase, addFavoriteFirebase } from './firebase.repository'
import { load } from './useLoad'

import user from './user.vue'
import post from './post.vue'
import list from './list.vue'
import { Favorite } from './model'

export default({
  components:{
    user,
    post,
    list
  },
  setup() {
    const users = ref()
    const posts =ref()
    const userPosts = ref()
    const favorites = ref()
    const loginUserId =ref()

    userPosts.value=[]

    const changeLoginUserId = (id:string)=>{
      loginUserId.value=id
      load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
        .then((v)=>{
          users.value = v.users
          posts.value = v.posts
          favorites.value = v.favorites
          userPosts.value = v.userPosts
        })
    }

    const  createUser = (name:string)=>{
      createUserFirebase(name).then(()=>{
        load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
          .then((v)=>{
            users.value = v.users
            posts.value = v.posts
            favorites.value = v.favorites
            userPosts.value = v.userPosts
          })
      })
    }  

    const CreatePost = (post:string,userId:string,userName:string)=>{
      createPostFirebase(post,userId,userName).then(()=>{
        load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
          .then((v)=>{
            users.value = v.users
            posts.value = v.posts
            favorites.value = v.favorites
            userPosts.value = v.userPosts
          })
      })
    }  

    const doFavorite = (postId:string, isFavorite:boolean)=>{
      if(!favorites.value) return 
      if(isFavorite){
          const filFavorites:Array<Favorite> = favorites.value.filter((v:Favorite)=>{
            return v.userId===loginUserId.value && v.postId === postId
          })
          if(filFavorites.length == 1){
            deleteFavoriteFirebase(filFavorites[0].favoriteId as string)
              .then(()=>{
                load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
                  .then((v)=>{
                    users.value = v.users
                    posts.value = v.posts
                    favorites.value = v.favorites
                    userPosts.value = v.userPosts
                  })
              })
          }
      }else{
        addFavoriteFirebase(postId,loginUserId.value)
        .then(()=>{
          load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
            .then((v)=>{
              users.value = v.users
              posts.value = v.posts
              favorites.value = v.favorites
              userPosts.value = v.userPosts
            })
        })

      }
    }

    const deleteUser = ( userId : string )=>{
      deleteUserFirebase(userId,userPosts.value,favorites.value)
      .then(()=>{
        load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
          .then((v)=>{
            users.value = v.users
            posts.value = v.posts
            favorites.value = v.favorites
            userPosts.value = v.userPosts
          })
      })
    }

    const deletePost = (postId:string)=>{
      const filFavorites:Array<Favorite> = favorites.value.filter((v:Favorite)=>{
        return v.postId === postId
      })
      deletePostFirebase(postId,filFavorites)
      .then(()=>{
        load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
          .then((v)=>{
            users.value = v.users
            posts.value = v.posts
            favorites.value = v.favorites
            userPosts.value = v.userPosts
          })
      })
    }

    onMounted(async()=>{
      load(users.value,posts.value,favorites.value,userPosts.value,loginUserId.value)
        .then((v)=>{
          users.value = v.users
          posts.value = v.posts
          favorites.value = v.favorites
          userPosts.value = v.userPosts
        })
    })
    return {
      userPosts,
      load,
      users,posts,
      favorites,
      loginUserId,
      changeLoginUserId,
      deleteUser,
      createUser,
      CreatePost,
      deletePost,
      doFavorite
    }
  },
})
</script>
<style lang="scss">
  h1{
    margin:25px 0px;
  }
  // .ly_top_inner{
  //   max-width: 1000px;
  //   margin:auto;
  // }
</style>