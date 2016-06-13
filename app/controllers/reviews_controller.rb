class ReviewsController < ApplicationController
    before_action :authenticate_user!

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
      params.require(:review).permit(:rating, :description)
  end

end
