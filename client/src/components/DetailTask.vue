<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a
        class="navbar-brand"
        href="https://vuejs.org/guide/essentials/forms.html"
        target="_blank"
        >Vue CRUD Web App</a
      >
    </div>
  </nav>

  <div class="container">
    <div class="row my-5">
      <div class="col-md-6 cardcenter">
        <div class="card">
          <div class="card-body">
            <form id="form-Task">
              <div class="form-group">
                <input
                  v-model="newTitle"
                  type="text"
                  id="title"
                  class="form-control"
                  maxlength="50"
                  autocomplete="off"
                  placeholder="Title"
                  required
                />
              </div>
              <div class="form-group m-1">
                <input
                  v-model="newDescription"
                  type="text"
                  id="description"
                  cols="30"
                  rows="10"
                  class="form-control"
                  maxlength="500"
                  autocomplete="off"
                  placeholder="Description"
                  required
                />
              </div>
              <div class="text-center m-3">
                <button
                  type="submit"
                  class="btn btn-success btn-inline"
                  @click.prevent="
                    currentEditingId ? updateTask(currentEditingId) : addTask()
                  "
                >
                  {{ currentEditingId ? "Update" : "Save" }}
                </button>
              </div>
              <div class="text-center"></div>
            </form>
          </div>
        </div>
      </div>

      <table class="table table-bordered mt-5 cardcenter">
        <thead>
          <tr>
            <th scope="col" class="text-center">Task</th>
            <th scope="col" class="text-center">Description</th>
            <th scope="col" class="text-center">Update</th>
            <th scope="col" class="text-center">Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="t in tasks" v-bind::key="t._id">
            <td scope="col" class="text-center">{{ t.title }}</td>
            <td scope="col" class="text-center">{{ t.description }}</td>
            <td scope="col" class="text-center" @click="editTask(t)">
              <button style="color: green">
                <font-awesome-icon icon="fa-solid fa-pen" />
              </button>
            </td>
            <td
              scope="col"
              class="text-center"
              style="color: red"
              @click="deleteTask(t._id)"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

// In your Vue component

export default {
  data() {
    return {
      // formData: {
      //
      // },
      tasks: [],
      formData: {
        newTitle: "",
        newDescription: "",
      },
      itemId: null,
      newTitle: "",
      newDescription: "",

      currentEditingId: null,
    };
  },

  async mounted() {
    const response = await axios.get(
      "http://localhost:3000/api/todoList/taskdetail"
    );
    this.tasks = response.data;
  },
  methods: {
    async addTask() {
      const response = await axios.post(
        "http://localhost:3000/api/todoList/create",
        { title: this.newTitle, description: this.newDescription }
      );
      this.tasks.push(response.data);
      (this.newTitle = ""), (this.newDescription = "");
    },

    async deleteTask(id) {
      await axios.delete(`http://localhost:3000/api/todoList/delete/${id}`);
      this.tasks = this.tasks.filter((task) => task._id !== id);
    },

    async updateTask(id) {
      console.log("update funtion call", id);

      const response = await axios.put(
        `http://localhost:3000/api/todoList/update/${id}`,
        { title: this.newTitle, description: this.newDescription }
      );
      console.log(response, "res[ponse get");
      const task = this.tasks.find((task) => task.id === id);
      console.log(task, "task jhgjhgvj");

      console.log(
        "newtitle and description",
        this.newTitle,
        this.newDescription
      );
      if (task) {
        task.newTitle = response.data.title;
        task.newDescription = response.data.description;
      }
      // clear form fields and reset currentEditingId
      this.newTitle = "";
      this.newDescription = "";
      this.currentEditingId = null;
      location.reload();
    },
    editTask(task) {
      this.newTitle = task.title;
      this.newDescription = task.description;
      this.currentEditingId = task._id;
    },

    // async updateData(id) {
    //   // Replace with the ID of the data you want to update
    //   try {
    //     const response = await axios(
    //       `http://localhost:3000/api/todoList/update/${id}`,
    //       {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(this.formData),
    //       }
    //     );

    //     if (response.ok) {
    //       const updatedData = await response.json();
    //       console.log("Updated Data:", updatedData);
    //     } else {
    //       console.error("Failed to update data");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },
};

// export default {
//   data() {
//     return {
//       newTitle: "",
//       newDescription: "",

//       tasks: [],
//     };
//   },

//   methods: {
//     async addTask() {
//       const response = await axios(
//         "http://localhost:3000/api/todoList/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             newTitle: this.newTitle,
//             newDescription: this.newDescription,
//           }),
//         }
//       );
//       const task = await response.json();
//       console.log(task);
//       this.tasks.push(task);
//       this.newTitle = "";
//       this.newDescription = "";
//     },
//     async updatetask(task) {
//       await axios(`http://localhost:3000/api/todoList/update/${task._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(task),
//       });
//     },
//     async deleteTodo(id) {
//       await axios(`http://localhost:3000/api/todoList/delete/${id}`, {
//         method: "DELETE",
//       });
//       this.tasks = this.tasks.filter((task) => task._id !== id);
//     },
//   },
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div table tbody {
  border-block-end-style: solid;
}
.cardcenter {
  margin-left: auto;
  margin-right: auto;
}
</style>
