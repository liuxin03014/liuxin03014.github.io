var posts=["posts/4a17b156.html","posts/8ab2dce2.html","posts/b18bdd93.html","posts/b18bdd93.html","posts/8f5ec72c.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };