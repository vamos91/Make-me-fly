class UsersController < ApplicationController

 def index
  @users = User.all
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
