class OrdersController < ApplicationController
  # skip_before_action :authenticate_user!
  # skip_after_action :verify_authorized
  #
  #




  def show
  @order = Order.where(status: 'paid').find(params[:id])
  authorize @order
  end


def create
  @ad = Ad.find(params[:ad_id])
  authorize @ad
  order = Order.create!(ad_sku: @ad.id, amount: @ad.price, status: 'pending')

  redirect_to new_order_payment_path(order)
end
end
