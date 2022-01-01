<template>
  <h3>ユーザ作成</h3>

  ユーザ名:<input v-model="user"><br>
  <button @click="createUser">登録</button>
  <p>ユーザリスト</p>
  <table>
    <thead>
      <th>ユーザ名</th>
      <th>削除</th>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user">
        <td>{{user.name}}</td>
        <td><button @click="deleteUser(user.id)">削除</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  props:{ users : Array },
  emits:['deleteUser' , 'createUser'],
  setup(props,{emit}) {
    const user = ref<string>()
    
    const createUser = ()=>{
      if(user.value==="" || user.value===undefined){
        alert('入力お願いします')
        return
      }
      if(!props.users) return
      const isUser : boolean = props.users.some((v:any)=>{
        return v.name === user.value
      })
      if(!isUser){
        emit('createUser',user.value)
        user.value=""
      }else{
        alert('名前が重複しています')
        return
      }
    }

    const deleteUser = (userId:string)=>{
      emit('deleteUser',userId)
    }
    return {
      user,
      createUser,
      deleteUser
    }
  },
})
</script>
