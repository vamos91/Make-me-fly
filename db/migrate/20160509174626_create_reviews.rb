class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :description
      t.integer :reviewer_id
      t.integer :reviewed_id

      t.timestamps null: false
    end
  end

    add_index :reviews, :reviewer_id
    add_index :reviews, :reviewed_id
    add_index :reviews, [:reviewer_id, :reviewed_id], unique: true
end
