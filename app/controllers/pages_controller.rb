class PagesController < ApplicationController

  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

 def get_count(description)
    description.split.count
 end

  def home
    @users_pilote = User.where(pilote: true).order(id: :desc).limit(3)
    @pilote = User.where(pilote: true)

   # @pendulaires = Ad.where("flight_date >= ? and category = ?", DateTime.now, "Pendulaire")
   #tous les users dont les annonces contiennent l'aeronef choisis
    @pendulaires = Aeronef.where("aeronef_category = ?", "Pendulaire").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_pendulaire = User.joins(:aeronefs).where("aeronef_category = ?", "Pendulaire").joins(:ads).where("flight_date >= ?", DateTime.now)
    @multiaxe = Aeronef.where("aeronef_category = ?", "Multiaxe").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_multiaxe = User.joins(:aeronefs).where("aeronef_category = ?", "Multiaxe").joins(:ads).where("flight_date >= ?", DateTime.now)
    @paramoteur = Aeronef.where("aeronef_category = ?", "Paramoteur").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_paramoteur = User.joins(:aeronefs).where("aeronef_category = ?", "Paramoteur").joins(:ads).where("flight_date >= ?", DateTime.now)
    @autogire = Aeronef.where("aeronef_category = ?", "Autogire").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_autogire = User.joins(:aeronefs).where("aeronef_category = ?", "Autogire").joins(:ads).where("flight_date >= ?", DateTime.now)
    @planeur = Aeronef.where("aeronef_category = ?", "Planeur").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_planeur = User.joins(:aeronefs).where("aeronef_category = ?", "Planeur").joins(:ads).where("flight_date >= ?", DateTime.now)
    @parapente = Aeronef.where("aeronef_category = ?", "Parapente").joins(:ads).where("flight_date >= ?", DateTime.now)
    @pilote_parapente= User.joins(:aeronefs).where("aeronef_category = ?", "Parapente").joins(:ads).where("flight_date >= ?", DateTime.now)

    if user_signed_in?
      @ads_hometown = Ad.near(current_user.hometown, 150, :unit => :km)
    end
    @ads = Ad.where("flight_date <= ?", DateTime.now).order(id: :desc).limit(9)
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
