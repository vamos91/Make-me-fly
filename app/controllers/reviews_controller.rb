class ReviewsController < ApplicationController
    before_action :logged_in_user

  def index
  end

  def new
  end

  def create
    review = Review.find(params[:reviewed_id])
  end

  def destroy
  end


end
