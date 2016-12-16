class UsersController < ApplicationController

 def index
  @userPilotes = User.where(pilote: true)
  #authorize @user
 end

 def show
   @user = User.find(params[:id])
   #authorize @user
 end


   private
  # def user_param
  #   params.require(:user).permit(:name, :pilote)
  # end


end
