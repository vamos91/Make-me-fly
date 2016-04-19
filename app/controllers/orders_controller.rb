class OrdersController < ApplicationController
  def show
  @order = Order.where(state: 'paid').find(params[:id])
  end


def create
  @ad = Ad.find(params[:ad_id])
  authorize @ad
  order = Order.create!(ad_sku: @ad.id, amount: @ad.price, status: 'pending')

  redirect_to new_order_payment_path(order)
end
end
