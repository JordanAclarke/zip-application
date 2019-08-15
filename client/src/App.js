import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css';
import CategoryList from './components/CategoryList.js'
import Category from './components/Category.js'
import NewCategoryForm from './components/NewCategoryForm.js'
import Post from './components/Post.js'
import Comment from './components/Comment.js'
import NewPostForm from './components/NewPostForm.js';
import NewCommentForm from './components/NewCommentForm';
import PreviewPage from './components/PreviewPage.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={PreviewPage} />
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path ="/categories/new" component={NewCategoryForm} />
          <Route exact path ="/categories/:id" component={Category} />
          <Route exact path = "/categories/:id/posts/new" component={NewPostForm} />
          <Route exact path = "/posts/:id" component={Post} />
          <Route exact path="/comments/new" component={NewCommentForm} />
          <Route path = "/comments/:id" component={Comment} /> 
          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
