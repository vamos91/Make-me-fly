class Aeronef < ActiveRecord::Base
  belongs_to :user
  mount_uploader :photos, PhotoUploader
end
