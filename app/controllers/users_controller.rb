class UsersController < ApplicationController

 def index
  @userPilotes = User.where(pilote: true)
  authorize @userPilotes
  @ads = policy_scope(Ad)
  authorize @ads
 end

 def user_ads
   @user = User.find(params[:id])
   @user_ads = Ad.where(user_id: @user)
   if @user_ads.empty?
    redirect_to user_path, notice: "#{@user.name.capitalize} n'a aucun vol"
   end
   authorize @user
 end



 def show
   @user = User.find(params[:id])
   @user_ads = Ad.where(user_id: @user)


   @user_articles = policy_scope(Article)
   @articles = @user_articles.reverse
   authorize @user_articles

   @markers = Gmaps4rails.build_markers(@user) do |user, marker|
      marker.lat user.latitude
      marker.lng user.longitude
    end
   authorize @user
 end

 def edit
   @user = User.find(params[:id])
   authorize @user
 end

 def update
   @user = User.find(params[:id])
   @user.update(user_param)
   if @user.save
    redirect_to user_path(current_user), notice: "Votre profil a été mit à jour"
    else
    render :edit
   end

 end
   private
  def user_param
    params.require(:user).permit(:name, :pilote, :hometown, :picture, :email)
  end


end
