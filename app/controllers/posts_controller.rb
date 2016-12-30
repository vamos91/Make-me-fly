class PostsController < ApplicationController
  before_action :find_article

  def index
    @posts = policy_scope(Post)
    authorize @posts
  end

  def show
    find_post
    authorize @post
  end

  def new
    @post = current_user.posts.build
    authorize @post
  end

  def create
    #@article = Article.find(params[:article_id])
    #@post = @article.posts.build(post_params)
    @post = @article.posts.build(post_params)
    @post.user_id = current_user.id
    authorize @post
    if @post.save
      redirect_to post_path(current_user)
    else
      render :new
    end
  end

  def edit
    find_post
    authorize @post
  end

  def update
    find_post
    authorize @post
    @post.update(post_params)
    if @post.save
      redirect_to user_path(current_user)
    else
      render :new
    end
  end

  def destroy
    find_post
    authorize @post
    @post.destroy
    redirect_to user_path(current_user)
  end


  private

  def post_params
    params.require(:post).permit(:user_id, :article_id, :text)
  end

  def find_article
    @article = Article.find(params[:article_id])
  end
end
