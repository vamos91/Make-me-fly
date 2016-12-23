class ArticlesController < ApplicationController

  def index
    @article = Article.all
  end

  def show
    find_article
  end

  def new

  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end


  private

  def article_params
    params.require(:article).permit(:title, :description, :video_url)
  end

  def find_article
    @article = Article.find(params[:id])
  end
end
