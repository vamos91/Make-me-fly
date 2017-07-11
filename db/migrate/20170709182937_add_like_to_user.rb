class AddLikeToUser < ActiveRecord::Migration
  def change
    add_column :users, :like, :string
  end
end
