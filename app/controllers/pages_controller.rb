class PagesController < ApplicationController
  def home
    @ads = Ad.all[0..8]
  end

  def detail
    @ad = Ad.first
  end

end
