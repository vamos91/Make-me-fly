
class PaymentsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized
  before_action :set_order



  def create
    @amount = @order.amount_cents
    customer = Stripe::Customer.create(
      source: params[:stripeToken],
      email: params[:stripeEmail]
      )



    charge = Stripe::Charge.create(
    customer: customer.id,
    amount: @amount, # in cents
    description: "Paiement pour le vol #{@order.ad_sku} pour un montant de #{@order.amount_cents}",
    currency: 'eur'
    )



    @order.update(payment: charge.to_json, status: 'paid')
    PaymentMailer.payment_confirmation(@order).deliver_now
    redirect_to order_path(@order)

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_order_payment_path(@order)
  end



private

  def set_order
    @order = Order.where(status: 'pending').find(params[:order_id])
  end
end







