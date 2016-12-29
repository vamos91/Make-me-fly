class PostsController < ApplicationController
  def index
    @posts = Post.all
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
    @post = current_user.posts.build(post_params)
    authorize @post
    if @post.save
      redirect_to user_path(current_user)
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
    params.require(:post).permit(:text)
  end

  def find_post
    @post = Post.find(params[:id])
  end
end
