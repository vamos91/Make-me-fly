class ReviewsController < ApplicationController
    before_action :logged_in_user

  def index
  end

  def new
    @review = Review.new
  end

  def create
    @review = Review.new(params[:reviewed_id])
    @review.save
  end

  def destroy
  end


private

 def review_params
    params.require(:review).permit(:ratong, :description)
end
