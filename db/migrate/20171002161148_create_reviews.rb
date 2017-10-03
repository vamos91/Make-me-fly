class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :description
      t.integer :reviewer_id
      t.integer :reviewed_id
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
