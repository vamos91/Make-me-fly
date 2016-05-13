class Review < ActiveRecord::Base

    belongs_to :reviewer, class_name: "User"
    belongs_to :reviewed, class_name: "User"
    validates :rating, presence: true
    validates :description, presence: true
    validates :reviewer_id, presence: true
    validates :reviewed_id, presence: true




end
