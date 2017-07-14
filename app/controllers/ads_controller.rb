class AdsController < ApplicationController
  skip_before_action :authenticate_user!

 def index
  #   authorize @ads
  @ads = policy_scope(Ad)
  authorize @ads
 end

 def ads
   @total_ads = Ad.where("flight_date >= ?", DateTime.now).order(created_at: :desc)
   authorize @total_ads
 end

 def show
   find_ad
   @ads = Ad.where(["flight_date >= ? and user_id = ?", DateTime.now, @ad.user])
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

 def booked
  #mettre booked a 1 lorque le user de l'ad clic sur "marquer comme reserver"
  find_ad
  @ad.booked = '1'
  @ad.save
  authorize @ad
  if @ad.save
    redirect_to ad_path(@ad), notice: 'Annonce marqué comme reservé'
  else
    redirect_to ad_path(@ad), notice: 'Annonce marqué comme reservé a échoué'
  end
 end

 def unbooked
  find_ad
  @ad.booked = '0'
  @ad.save
  authorize @ad
  if @ad.save
    redirect_to ad_path(@ad), notice: 'Annonce marqué comme disponible'
  else
    redirect_to ad_path(@ad), notice: 'Annonce marqué comme disponible a échoué'
  end
 end

 def new
      #si le user est un pilote il peut faire une annonce sinon il doit s'identifier comme pilote et remplir son profil
    if user_signed_in? && current_user.pilote?
      @ad = current_user.ads.build
      authorize @ad
    else
      redirect_to new_user_registration_path
    end
  end

  def create
    @ad = current_user.ads.build(ad_params)
    #@ad.price = (@ad.price*1.1)
    authorize @ad

    if @ad.save
      AdMailer.creation_confirmation(@ad).deliver_now
      @users = User.near(@ad.address, 100, :units => :km)
      #doit envoyer un mail a tous les user qui habite dans les 100 km à la ronde.
       @users.each do |user|
        #cree un mailer pour informer les user d'un vol
         if current_user != user
          SendMailToCloseUser.send_creation_ad_to_users(user, @ad).deliver_now
         end
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
    if @city.nil?
      @ads = Ad.where("flight_date >= ?", DateTime.now).order(created_at: :desc)
    else
      @ads = Ad.near(@city, 100, :units => :km)
      if @ads.empty?
        redirect_to root_path, notice: "IL N'Y A AUCUN VOL AUX ALENTOURS DE #{@city.upcase}"
      end
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
