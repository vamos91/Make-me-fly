class ContactsController < ApplicationController

  def create
    @contact = Contact.new(contact_params)
    authorize @contact
    if @contact.save
      redirect_to root_path
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:nb_pax, :date_vol, :user_name, :email, :price, :location)
  end
end
