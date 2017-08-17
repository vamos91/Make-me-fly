class PagesController < ApplicationController

  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

  def home
    @users_pilote = User.where(pilote: true).order(id: :desc).limit(3)
    @pilote = User.where(pilote: true)
    if user_signed_in?
      @ads_hometown = Ad.near(current_user.hometown, 150, :unit => :km)
    end
    @ads = Ad.where("flight_date >= ?", DateTime.now).order(id: :desc).limit(9)
  end


  def dashboard
    if params[:pilote] == 'true'
      current_user.pilote = true
    elsif params[:pilote] == 'false'
      current_user.pilote = false
    else
      #current_user.pilote = nil
    end
    current_user.save
  end

  def flight_form
    @ad = current_user.ads.build
    authorize @ad
  end




end
