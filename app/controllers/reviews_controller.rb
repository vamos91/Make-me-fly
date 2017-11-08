class ReviewsController < ApplicationController

  def index
    @reviews = policy_scope(Review)
    authorize @reviews
  end

  def new
    @review = current_user.reviews.build
    authorize @review
  end

  def create
     @review = current_user.reviews.build(review_params)
     authorize @review
     @review.reviewed_id = params[:review][:reviewed_id]
     @user = @review.reviewed_id
     @test = @review.rating
     @star_rating = @test[0]
     @review.rating = @star_rating
    if @review.save
      redirect_to user_path(@user), notice: 'commentaire ajouté.'
    end
  end

  private

  def find_reviews
    @review = Review.find(params[:id])
    authorize @review
  end

  def review_params
    params.require(:review).permit(:description, :rating, :reviewer_id, :reviewed_id, :user_id)
  end
end
