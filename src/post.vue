<template>
  <h3>投稿作成</h3>
  ユーザ名：
  <select v-model="selectUser">
    <option v-for="(user,k) in users" :key="user" :k=k :value="user">{{user.name}}</option>
  </select>
  <br>
  内容:<input type="text" v-model="post"><br>
  <button @click="createPost">投稿</button>

</template>
<script lang="ts">
import { defineComponent,ref,onMounted, computed } from 'vue'

export default defineComponent({
  props:{ users : Array , userPosts:Array},
  emits:["CreatePost"],
  setup(props,{emit}) {
    const post = ref()
    const selectUser = ref() 
    const posts = ref()

    const users = computed(()=>{
      post.value=""
      return props.users 
    })

    const userPosts = computed(()=>{
      post.value=""
      return props.userPosts 
    })

    const createPost = ()=>{
      if(post.value===""){
        alert('入力お願いします')
        return
      }
      emit("CreatePost",post.value,selectUser.value.id,selectUser.value.name)
    }

    onMounted(()=>{
    })
    return{
      post,
      createPost,
      selectUser,
      users,
      posts,
      userPosts
    }
  },
})
</script>
