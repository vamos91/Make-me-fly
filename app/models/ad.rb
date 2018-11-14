class Ad < ActiveRecord::Base

  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  validates :flight_date, :price, :titre, :photo, :description, :address, presence: true
  validates :user, presence: true
  validates :aeronef_id, presence: true

  belongs_to :user
  belongs_to :aeronef
  mount_uploader :photo, PhotoUploader
  monetize :price_cents

end
