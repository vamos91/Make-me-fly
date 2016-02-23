class Ad < ActiveRecord::Base




validates :flight_date, :price, :description, presence: true
belongs_to :user

end
