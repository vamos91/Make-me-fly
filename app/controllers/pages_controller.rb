class PagesController < ApplicationController

  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

  def home
    ad = Ad.count
    @pilote_counter = User.where("pilote = ?", true).count
    @passager_counter = User.where("pilote = ?", false).count
    #@ads = Ad.all.sort[ad-9..ad].reverse
    #@ads = Ad.order(id: :desc).limit(9)
    @ads = Ad.where("flight_date >= ?", DateTime.now).order(id: :desc).limit(9)
  #si la date du vol est supérieur à la date.now on incremente un conmpteur de 1 dans une boucle

  @ads_counter = 0
  Ad.all.each do |c|
    if c.flight_date >= DateTime.now
      @ads_counter = @ads_counter + 1
    end
  end
   return @ads_counter



  end
end
