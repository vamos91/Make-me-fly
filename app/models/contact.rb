class Contact < ActiveRecord::Base
  belongs_to :user

  validates :nb_pax, :date_vol, presence: true
  after_create :booking_message

  def booking_message
   FlightBooking.booking(self).deliver_now
 end

def booking_date
  toto = date_vol.to_time
  toto.strftime("%d/%m/%Y")
end
end
