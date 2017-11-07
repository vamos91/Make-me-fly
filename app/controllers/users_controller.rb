
class UsersController < ApplicationController
#skip_before_action :authenticate_user!
before_action :find_user, only: [:upvote, :downvote]

 def index
  @userPilotes = User.where(pilote: true)
  authorize @userPilotes
  @ads = policy_scope(Ad)
  authorize @ads
  @users = User.order('created_at DESC').paginate(page: params[:page], per_page: 30)
  @articles = Article.all
 end



 def user_ads
   find_user
   @user_ads = Ad.where(user_id: @user)
   if @user_ads.empty?
    redirect_to user_path, notice: "#{@user.name.capitalize} n'a aucun vol"
   end
   authorize @user
 end

 def show
   find_user
   @ads_time = Ad.where("flight_date >= ?", DateTime.now)
   @user_flight = Ad.where(["flight_date >= ? and user_id = ?", DateTime.now, @user])
   @ads = policy_scope(@ads_time)
   authorize @ads
   @post = Post.new
   #affiche le nombre de vol du current_user
   @user_ads = Ad.where(user_id: @user)

   @article = current_user.articles.build
   authorize @article


   @user_articles = Article.where(user_id: @user)
   @articles = @user_articles.reverse
   authorize @user_articles
   authorize @user

   @users_near_from_me = User.near(@user.hometown, 100, :units => :km)
   @ad = current_user.ads.build
   authorize @ad

   @aeronefs = Aeronef.where(user_id: @user.id)
   @aeronef = Aeronef.where(user_id: current_user.id)
   @reviews = Review.where(reviewed_id: @user.id)

   @review = current_user.reviews.build
   #authorize @review

 end

 def edit
   @user = User.find(params[:id])
   authorize @user
 end

 def update
   @user = User.find(params[:id])
   authorize @user
   @user.update(user_param)
   if @user.save
    redirect_to user_path(current_user), notice: "Votre profil a été mit à jour"
    else
    render :edit
   end
 end

 def upvote
  @user.upvote_from current_user
  authorize @user
  redirect_to user_path(@user)
 end

 def downvote
  @user.downvote_from current_user
  authorize @user
  redirect_to user_path(@user)
 end
   private
  def user_param
    params.require(:user).permit(:name, :pilote, :hometown, :picture, :email, :tel, :description, :picture_ulm_user, :pilotevalidation, :assurance, :brevet_pilote, :licence_ulm)
  end

  def find_user
    @user = User.find(params[:id])
  end

  def article_params
    params.permit(:article_id)
  end

  # def set_article
  #   @article = Article.find(params[:article_id])
  # end


end
