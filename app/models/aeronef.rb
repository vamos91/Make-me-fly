class Aeronef < ActiveRecord::Base
  belongs_to :user
  has_many :ads, dependent: :destroy
  mount_uploader :photos, PhotoUploader
end
