class Aeronef < ActiveRecord::Base
  belongs_to :user
  has_many :ads, dependent: :destroy
  validates :annee, presence: true
  validates :cylindre, presence: true
  validates :vitesse, presence: true
  validates :equipement, presence: true
  validates :autonomie, presence: true
  validates :photos, presence: true
  validates :marque, presence: true
  validates :modele, presence: true
  validates :image_1, presence: true
  validates :image_2, presence: true
  validates :image_3, presence: true
  validates :image_4, presence: true
  mount_uploader :photos, PhotoUploader
  mount_uploader :image_1, PhotoUploader
  mount_uploader :image_2, PhotoUploader
  mount_uploader :image_3, PhotoUploader
  mount_uploader :image_4, PhotoUploader
end
