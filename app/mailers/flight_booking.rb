class FlightBooking < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.flight_booking.booking.subject
  #
  def booking_temp(user, booking_sender, date, place, price)
    @booking_sender = booking_sender
    @user = user
    @date = date
    @place = place
    @price = price
    mail(to: @user.email, subject: "Demande de reservation de vol venant de #{@booking_sender.name.capitalize}")

  end

  def booking(contact)
    @contact = contact
    mail(to: @contact.email, subject: "Demande de reservation de vol venant de #{@contact.user}" )

  end
end








