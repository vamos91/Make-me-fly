class Aeronef < ActiveRecord::Base
  belongs_to :user
  has_many :ads, dependent: :destroy
  validates :image_1, :image_2, :image_3, :image_4, :nom, :cylindre, :annee, :vitesse, :equipement, :autonomie, :marque, :modele, :photos, presence:true
  mount_uploader :photos, PhotoUploader
  mount_uploader :image_1, PhotoUploader
  mount_uploader :image_2, PhotoUploader
  mount_uploader :image_3, PhotoUploader
  mount_uploader :image_4, PhotoUploader
end
