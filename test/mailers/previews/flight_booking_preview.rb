# Preview all emails at http://localhost:3000/rails/mailers/flight_booking
class FlightBookingPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/flight_booking/booking
  def booking
    FlightBooking.booking
  end

end
