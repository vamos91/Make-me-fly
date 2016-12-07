class UsersController < ApplicationController

 def index
  @users = User.all
  @users = User.near(@users.ad.address, 100, :units => :km)
  #authorize @user
 end

 def show
   @user = User.find(params[:id])
   #authorize @user
 end

  # def new
  #   @user = User.new
  # end

  # def create
  #   @user = User.new(user_param)
  # end




   private
  # def user_param
  #   params.require(:user).permit(:name, :pilote)
  # end
  def find_ad
    @ad = Ad.find(params[:id])
  end

end
