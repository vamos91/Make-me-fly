class Ad < ActiveRecord::Base

validates :flight_date, :prix, :description, presence: true
belongs_to :user

end
