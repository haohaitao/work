// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'todomvc-app-css/index.css'
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

let filter = {
  all(todos){
      return todos;
  },
  active(todos){
    return todos.filter((todo)=>{
        return !todo.completed;
    })
  },
   completed(todos){
    return todos.filter((todo)=>{
        return todo.completed;
    })
  }
}

/* eslint-disable no-new */
let app = new Vue({
  el: '.todoapp',
  data:{
    'redean':'awesome',
     'title':'todo-Yo',
     newTodo:'',
     todos:[{
        content:'周慧敏',
        completed:false
     },
     {
        content:'王祖贤',
        completed:false
     },
     {
        content:'钟楚红',
        completed:false
     }
     ],
     edited:null,
     hashName:'all'
  },
  computed:{
    remain(){
        return  filter.active(this.todos).length;
    },
    isAll: {
       get(){
          return this.remain === 0;
       },
       set(flag){
         this.todos.forEach((item)=>{
              item.completed =flag;
          })
       }
    },
    filteredTodos(){
      return filter[this.hashName](this.todos);
    }
  },
  methods:{
    addTodo:function (e) {
      if(!this.newTodo) return;
      this.todos.push({
        content: this.newTodo,
        completed:false
      });
      //还原输入项
      this.newTodo = '';
    },
    removeTodo:function (i) {
      this.todos.splice(i,1);
    },
    editTodo(todo){
      this.editCache = todo.content;
      this.edited = todo;
    },
    cancleEdit(todo){
       this.edited = null;
       todo.content = this.editCache;
    },
    doneEdit(todo,index){
      this.edited = null;
      if(!todo.content) {
        this.removeTodo(index);
      }
    },
    clear(){
      this.todos = filter.active(this.todos);
    }
  },
  directives:{
    focus(el,value){
        if(value){
            el.focus();
        }
    }
  }
})

window.addEventListener('hashchange',hashchanged);

function hashchanged() {
  let hashName = location.hash.replace(/#\/?/,'');
  if (filter[hashName]) {
    app.hashName = hashName;
  } else {
    location.hash = '';
    app.hashName = 'all';
  }
}