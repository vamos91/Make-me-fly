class AdsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:search]

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
   # user_ad = User.where(id: @ad.user_id)
   # @aeronefs = Aeronef.find_by_id(user_ad.id)
   @ads = Ad.where(["flight_date >= ? and user_id = ?", DateTime.now, @ad.user])
   @markers = Gmaps4rails.build_markers(@ad) do |ad, marker|
      marker.lat ad.latitude
      marker.lng ad.longitude
    end

   @aeronef = Aeronef.where(id: @ad.aeronef)
   @reviews = Review.where(reviewed_id: @ad.user)
   @contact = Contact.new

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

 def booking_message
   find_ad
   booking_sender = current_user
   user = @ad.user
   date = @ad.flight_date
   place = @ad.address
   price = @ad.price_cents
   FlightBooking.booking(user, booking_sender, date, place, price).deliver_now
   redirect_to new_message_path(to: @ad.user.id), notice: "Un message a été envoyé à #{@ad.user.name}"
 end

 def new
    @aeronefs = Aeronef.where(user_id: current_user.id)
    authorize @aeronefs
   # @user = ad_user.user_id
    if user_signed_in? && current_user.pilote?
      @ad = current_user.ads.build
      authorize @ad
    else
      redirect_to new_user_registration_path
    end
  end

  def create
    @aeronefs = Aeronef.where(user_id: current_user.id)
    @ad = current_user.ads.build(ad_params)
    #@ad.price = (@ad.price*1.1)
    authorize @ad
    # aeronef = Aeronef.where(params[:aeronef.id])
    # @ad.aeronef_id = aeronef.id

    aeronef = params[:ad][:category]
    @ad.aeronef_id = aeronef

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
    @planes = params[:multiple]
    @date = params[:date]
    @category = params[:category]
    @all_flight = params[:all_flight]
    if @all_flight == 'all_flight'
      @ads = Ad.where("flight_date >= ?", DateTime.now).order(created_at: :desc)

    else

    if @category.present?
      @ads = Ad.where("flight_date >= ? and category = ?", DateTime.now, @category).order(created_at: :desc)
      if @ads.count == 0
        flash[:notice] = "Aucun vol en #{@category} pour le moment."
      end
    else
    if @city.blank?
      @ads = Ad.where("flight_date >= ?", DateTime.now).order(created_at: :desc)
    else
      if @planes == ["Aéronef"]
        @ads = Ad.near(@city, 200, :units => :km)
      else
        if @date.blank?
          @ads_category = Ad.where("flight_date >= ? and category = ?", DateTime.now, @planes).order(created_at: :desc)
          @ads = @ads_category.near(@city, 200, :units => :km)
        else
           @ads = Ad.where("flight_date = ? and category = ?", @date, @planes).order(created_at: :desc)
          @ads = @ads_category.near(@city, 200, :units => :km)
          if @ads.empty?
            redirect_to root_path, notice: "IL N'Y A AUCUN VOL AUX ALENTOURS DE #{@city.upcase}"
          end
        end
    end
    # Let's DYNAMICALLY build the markers for the view.

  end
end
end



@markers = Gmaps4rails.build_markers(@ads) do |ad, marker|
      marker.lat ad.latitude
      marker.lng ad.longitude
    end
end

#--------------------------------------------------------
  private
# # update et create
  def ad_params
    params.require(:ad).permit(:aeronef_id, :description, :date, :price, :flight_date, :flight_time, :address, :photo, :photo_cache, :category, :titre)
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
