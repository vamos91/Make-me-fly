class Review < ActiveRecord::Base
  belongs_to :user
  validates :rating, :description, presence: true
end
