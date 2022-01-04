<template>
  <h3 style="margin-bottom:15px;">投稿作成</h3>
  <div class="row g-3">
    <label for="staticEmail" class="col-sm-2 col-form-label">ユーザ選択</label>
    <div class="col-auto">
      <select class="form-select form-select-sm" style="width:200px" v-model="selectUser">
        <option  v-for="(user,k) in users" :key="user" :k=k :value="user">{{user.name}}</option>
      </select>
    </div>
  </div>
  <div class="row g-3">
    <label for="staticEmail" class="col-sm-2 col-form-label">メモ</label>
    <div class="col-auto">
      <input type="text" v-model="post" class="form-control" id="inputPassword2">
    </div>
    <div class="col-auto">
      <button type="submit" @click="createPost" class="btn btn-primary mb-3">投稿</button>
    </div>
  </div>
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
