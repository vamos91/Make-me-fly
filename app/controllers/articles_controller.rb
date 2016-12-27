class ArticlesController < ApplicationController

  def index
    #@articles = Article.all
    @articles = policy_scope(Article)
    authorize @articles
  end

  def show
    find_article
    authorize article
  end

  def new
    @article = current_user.articles.build
    authorize @article
  end

  def create
      @article = current_user.articles.build(article_params)

      @v_url = @article.video_url
     @video_id = (/([\w-]{11})/.match(@v_url)).to_s
     @embed_code = "<iframe width='640' height='360' src='http://www.youtube.com/embed/#{@video_id}' frameborder='0' allowfullscreen></iframe>"
      authorize @article
      if @article.save
        redirect_to user_path(current_user), notice: "Votre article a été ajouté"
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
      redirect_to root_path, notice: "Votre article à été mis à jour"
    else
      render :edit
    end
  end

  def destroy
    find_article
    authorize @article
    @article.destroy
    redirect_to root_path, notice: "Votre article a été effacé avec succès"
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :video_url)
  end

  def find_article
    @article = Article.find(params[:id])
  end
end