<template>
  <div class="PostBox">
    <ul class="post-list" v-for="item in post" :key="item._id">
      <li class="post-item">
        <div class="post-data">
          <div class="post-title">
            <span>
              {{ item.title }}
            </span>
          </div>
          <div class="post-body">
            <span>
              {{ item.content }}
            </span>
          </div>
          <div class="post-date">
            <span>
              {{ item.createdAt }}
            </span>
          </div>
        </div>
        <div class="post-btn-wrapper">
          <button class="post-btn" @click="removePost(item._id)">X</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostBox",
  props: {
    post: Array,
  },
  methods: {
    ...mapActions("managePost", ["removePost"]),
  },
};
</script>

<style lang="scss" scoped>
.PostBox {
  border-radius: 8px;
  margin: 10px;

  .post-list {
    padding: 15px 30px;
    border: 0.5px solid #000;
    background: rgb(218, 218, 218);
    transition: background 0.2s ease-in-out;
    &:hover {
      border: 0.5px solid #00766c;
      background: #64d8cb;

      .post-item {
        .post-btn-wrapper {
          .post-btn {
            transition: color 0.2s ease-in-out;
            color: #00766c;
          }
        }
      }
    }
    .post-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .post-data {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        .post-title {
          font-weight: 700;
          font-size: 1.5em;
        }
        .post-body {
          // color: rgb(94, 93, 93);
        }
        .post-date {
          font-size: 0.75em;
          color: rgb(121, 121, 121);
        }
      }
      .post-btn-wrapper {
        display: inline-block;
        .post-btn {
          border: none;
          font-weight: 700;
          font-size: 16pt;
          background-color: transparent;
          color: rgb(66, 66, 66);
          &:hover {
            color: black;
            transition: color 0.3s ease-in-out;
          }
        }
      }
    }
  }
  .post-list:not(:last-child) {
    border-bottom: 0.5px solid #003b36;
  }
}
</style>
