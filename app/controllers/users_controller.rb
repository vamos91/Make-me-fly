class UsersController < ApplicationController

 def index
  @userPilotes = User.where(pilote: true)
  @ads = policy_scope(Ad)
  authorize @ads
  authorize @userPilotes
 end

 def show
   @user = User.find(params[:id])
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
