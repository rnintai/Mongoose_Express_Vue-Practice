<template>
  <div class="Modal">
    <h5>추가하기</h5>
    <div class="modal-title">
      <label for="title">제목</label>
      <input type="text" class="title" v-model="post.title" />
    </div>
    <div class="modal-content">
      <label for="content">내용</label>
      <input type="text" class="content" v-model="post.content" />
    </div>
    <div class="button-wrap">
      <b-button variant="success" @click="addPost(post)">추가</b-button>
      <b-button variant="danger" @click="closeModal">취소</b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Modal",
  data: () => ({
    post: {
      title: null,
      content: null,
    },
  }),
  methods: {
    ...mapMutations(["closeModal"]),
    ...mapActions("addpost", ["addPost"]),
  },
};
</script>

<style lang="scss" scoped>
.Modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: fixed;
  width: 30%;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  .modal-title {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    border: none;
    width: 100%;
  }
  .button-wrap {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;
    .btn-success {
      flex-basis: 60%;
    }
    .btn-danger {
      flex-basis: auto;
    }
  }
}
</style>
