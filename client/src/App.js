import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css';
import CategoryList from './components/CategoryList.js'
import Category from './components/Category.js'
import NewCategoryForm from './components/NewCategoryForm.js/index.js'
import Post from './components/Post.js'
import Comment from './components/Comment.js'
import NewPostForm from './components/NewPostForm.js';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <h1>Zip</h1>
          <Link to="/">All Categories</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={CategoryList} />
          <Route path ="/categories/new" component={NewCategoryForm} />
          <Route path ="/categories/:id" component={Category} />
          <Route path = "/posts/new" component={NewPostForm} />
          <Route path = "/posts/:id" component={Post} />
          <Route path = "/comments/:id" component={Comment} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
