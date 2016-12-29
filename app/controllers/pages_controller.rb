class PagesController < ApplicationController

  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

  def home
    #ad = Ad.count
    #@pilote_counter = User.where("pilote = ?", true).count
    #@passager_counter = User.where("pilote = ?", false).count
    #@ads = Ad.all.sort[ad-9..ad].reverse
    #@ads = Ad.order(id: :desc).limit(9)
    if user_signed_in?
      @ads_hometown = Ad.near(current_user.hometown, 150, :unit => :km)
    end

    if user_signed_in? && @ads_hometown.nil?
      @ads = Ad.near(current_user.hometown, 150, :unit => :km)
    else
      @ads = Ad.where("flight_date >= ?", DateTime.now).order(id: :desc).limit(9)
    end


  #si la date du vol est supérieur à la date.now on incremente un conmpteur de 1 dans une boucle
    # @ads_by_date_counter = Ad.where("flight_date >= ?", DateTime.now)
    # @ads_counter = 0
    # @ads_by_date_counter.each do |c|
    #   if c.flight_date >= DateTime.now
    #     @ads_counter = @ads_counter + 1
    #   end
    # end
    #  return @ads_counter
  end

end
