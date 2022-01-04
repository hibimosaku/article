<template>
  <h3 style="margin-bottom:15px;">リスト</h3>
  <div class="row g-3" style="margin-bottom:10px;">
    <label for="staticEmail" class="col-sm-2 col-form-label">ユーザ選択</label>
    <div class="col-auto">
      <select class="form-select form-select-sm" style="width:200px" v-model="loginUserId" @change="changeLoginUserId">
        <option v-for=" user in users" :key="user" :value="user.id">{{user.name}}</option>
      </select>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">投稿</th>
        <th scope="col">ユーザ名</th>
        <th scope="col">お気に入り</th>
        <th scope="col">お気に入り件数</th>
        <th scope="col">削除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" userPost in storeUserPosts" :key="userPost">
        <td>{{userPost.memo}}</td>
        <td>{{userPost.userName}}</td>
        <td>
          <button v-if="loginUserId===undefined" style="display:none;"></button>
          <button v-else @click="doFavorite(userPost.postId,userPost.isFavorite)" 
          style="background-color: transparent; border: none; cursor: pointer; outline: none; padding: 0; appearance: none;">
            <span v-if="userPost.isFavorite">♥</span>
            <span v-else>♡</span>
          </button>
        </td>
        <td>{{userPost.countFavorite}}件数</td>
        <td><span class="badge bg-primary" style="cursor:pointer;" @click="deletePost(userPost.postId,userPost.isFavorite)" v-if="userPost.userId===loginUserId"
        >削除</span></td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  props:{
    userPosts:Array,
    favorites:Array,
    users:Array,
  },
  emits:["doFavorite","changeLoginUserId","deletePost"],
  setup(props,{ emit }) {
    const loginUserId = ref()

    const storeUserPosts = computed(()=>{
      return props.userPosts
    })
    
    const changeLoginUserId = ()=>{
      emit('changeLoginUserId',loginUserId.value)
    }
    
    const doFavorite = (postId:string, isFavorite:boolean) : void=>{
      emit('doFavorite',postId, isFavorite)
    }

    const deletePost = (postId:string)=>{
      emit('deletePost',postId)
    }

    return {
      doFavorite,
      storeUserPosts,
      loginUserId,
      deletePost,
      changeLoginUserId,
    }
  },
})
</script>
<style lang="scss">
th{
  border-bottom : solid 1px blue;
}
td{
  border-right: solid 1px blue;
  &:last-child{
    border-right: none;
  }
}
th,td{
  padding:10px;
  border-right: solid 1px blue;
  &:last-child{
    border-right: none;
  }

}

</style>
