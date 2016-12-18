class UsersController < ApplicationController

 def index
  @userPilotes = User.where(pilote: true)
  #authorize @user
 end

 def show
   @user = User.find(params[:id])
   #authorize @user
 end

 def edit
   @user = User.find(params[:id])
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
