class ArticlesController < ApplicationController

  def index
    @users = User.all
    @articles = policy_scope(Article).order(created_at: :desc)
    authorize @articles
    @post = Post.new
    @article = current_user.articles.build
    authorize @article
    if user_signed_in? && current_user.pilote?
      #@ad = Ad.new
      @ad = current_user.ads.build
      authorize @ad
    else
      redirect_to new_user_registration_path
    end
  end

  def show
    find_article
    authorize @article
    @posts = Post.where(article_id: @article)
  end

  def new
    @article = current_user.articles.build
    authorize @article
  end

  def create
      @article = current_user.articles.build(article_params)
      authorize @article
      if @article.save
        redirect_to articles_path, notice: "Votre article a été ajouté"
        #redirect_to articles_user_path(@user), notice: "Votre article a été ajouté"
      else
        render :new
      end
  end

  def edit
    find_article
    authorize @article
  end

  def update
    find_article
    authorize @article
    @article.update(article_params)
    if @article.save
      redirect_to user_path(current_user), notice: "Votre article à été mis à jour"
    else
      render :edit
    end
  end

  def destroy
    find_article
    authorize @article
    @article.destroy
    redirect_to user_path(current_user), notice: "Votre article a été effacé avec succès"
  end

  private

  def article_params
    params.require(:article).permit(:user_id, :title, :description, :video_url, :picture_article)
  end

  def find_article
    @article = Article.find(params[:id])
  end
end
