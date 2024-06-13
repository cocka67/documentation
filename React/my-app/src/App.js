import React, { useState } from 'react';
import "./globals.css";
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';
import { MyInput } from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JS", body: "Description" },
    { id: 2, title: "JS 2", body: "Description" },
    { id: 3, title: "JS 3", body: "Description" }
  ])
  const [selectedSort, setSelectedSort] = useState("")

  const [searchQuery, setSearchQuery] = useState("")

  function getSortedPosts() {
    if(selectedSort){
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }

  const sortedPosts = getSortedPosts()


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  function removePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)} 
          placeholder="Поиск..."
        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" }
          ]}
        />
      </div>
      {posts.length
        ?
        <PostList remove={removePost} posts={selectedSort} title="Посты про JS" />
        :
        <h1 style={{ textAlign: "center" }}>
          Посты не найдены!!!
        </h1>
      }
    </div>
  );
}

export default App;
