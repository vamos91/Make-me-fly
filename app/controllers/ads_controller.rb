class AdsController < ApplicationController




 #before_action :find_user, only: [:new, :create]

 def index
  @ads = Ad.all
 end

 def show
   @ad = Ad.find(params[:id])
 end

  def new
    @ad = Ad.new
  end

  def create
    @ad = Ad.new(ad_params)
    # @ad.user = current_user
    @ad.save
    redirect_to ads_path
  end

  # def edit
  #   @ad = Ad.find(params[:id])
  #   @user = User.find(find_user)
  # end

  # def update
  #   @ad = @user.ads.build(param_ad)
  #   @ad.save
  #   redirect_to user_path(@user)
  # end

  # def destroy
  #   @ad = Ad.find(params[:id])
  #   @ad.destroy
  #   redirect_to users_path
  # end



#--------------------------------------------------------


  private
# # update et create
  def ad_params
    params.require(:ad).permit(:description, :date, :price, :flight_date)
  end

  # def find_user
  #   @ad = Ad.find(params[:user_id])
  # end




end
