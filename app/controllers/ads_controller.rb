class AdsController < ApplicationController
  skip_before_action :authenticate_user!
  #before_action :set_forecast, only: [:show]


 def index
   #@ads = Ad.all
  #   authorize @ads
  @ads = policy_scope(Ad)
  authorize @ads
 end

 def show
   find_ad
   @ads = Ad.where(user_id: @ad.user)
   @markers = Gmaps4rails.build_markers(@ad) do |ad, marker|
      marker.lat ad.latitude
      marker.lng ad.longitude
    end

   @forecast = Forecast.new(
    lat: @ad.latitude,
    lng: @ad.longitude
    )
   @weather = @forecast.get_weather_data
   @current_weather = @weather.currently
   @daily_weather = @weather.daily.data.first(5)
 end

 def chat
    find_ad
    @conversations = Conversation.where(ad_id: @ad.id, recipient_id: @ad.user.id, sender_id: current_user.id)
    if @conversations.empty?
      @conversation = Conversation.new(
        ad_id: @ad.id,
        recipient_id: @ad.user.id,
        sender_id: current_user.id
        )
      if @conversation.save
        redirect_to ad_conversation_messages_path(@ad, @conversation)
      end
    else
      redirect_to ad_conversation_messages_path(@ad, @conversations.first)
    end
 end

 def new
      #@ad = Ad.new
      #si le user est un pilote il peut faire une annonce sinon il doit s'identifier comme pilote et remplir son profil

    if user_signed_in? && current_user.pilote?
      #@ad = Ad.new
      @ad = current_user.ads.build
      authorize @ad
    else
      redirect_to new_user_registration_path
    end
  end

  def create
    # @ad = Ad.new(ad_params)
    # @ad.user = current_user
    @ad = current_user.ads.build(ad_params)
    @ad.price = (@ad.price*1.1)
    authorize @ad

    if @ad.save
      AdMailer.creation_confirmation(@ad).deliver_now
      @users = User.near(@ad.address, 100, :units => :km)
      #doit envoyer un mail a tous les user qui habite dans les 100 km à la ronde.
       @users.each do |user|
        #cree un mailer pour informer les user d'un vol
         AdMailer.creation_confirmation(@ad).deliver_now
       end
      redirect_to ad_path(@ad), notice: 'Annonce crée avec succès'
    else
      render :new
    end
  end

  def edit
    find_ad
  end

  def update
    find_ad
    @ad.update(ad_params)
    if @ad.save
      redirect_to ads_path, notice: 'Annonce updatée avec succès'
    else
      render :edit
    end
  end

  def destroy
    find_ad
    @ad.destroy
    redirect_to ads_path, notice: 'Annonce effacée avec succès'
  end

  def search
    @city = params[:q]
    @ads = Ad.near(@city, 100, :units => :km)
    if @ads.empty?
      redirect_to root_path, notice: "IL N'Y A AUCUN VOL AUX ALENTOURS DE #{@city.upcase}"
    end
    # Let's DYNAMICALLY build the markers for the view.
    @markers = Gmaps4rails.build_markers(@ads) do |ad, marker|
      marker.lat ad.latitude
      marker.lng ad.longitude
    end
  end

#--------------------------------------------------------
  private
# # update et create
  def ad_params
    params.require(:ad).permit(:description, :date, :price, :flight_date, :flight_time, :address, :photo, :photo_cache, :category)
  end

  def find_ad
    @ad = Ad.find(params[:id])
    authorize @ad
  end

  def conversation_params
    params.permit(:sender_id, :recipient_id, :ad_id)
  end

  # def set_forecast
  #   @forecast = Forecast.find(params[:id])
  # end

  def forecast_params
    params.require(:forecast).permit(:lat, :lng)
  end

  def user_params
    params.require(:user).permit(:hometown)
  end


end
