class Aeronef < ActiveRecord::Base
  belongs_to :user
  has_many :ads, dependent: :destroy
  mount_uploader :photos, PhotoUploader
  mount_uploader :image_1, PhotoUploader
  mount_uploader :image_2, PhotoUploader
  mount_uploader :image_3, PhotoUploader
  mount_uploader :image_4, PhotoUploader
end
