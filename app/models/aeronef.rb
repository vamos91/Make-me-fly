class Aeronef < ActiveRecord::Base
  belongs_to :user
  has_many :ads
  mount_uploader :photos, PhotoUploader
end
