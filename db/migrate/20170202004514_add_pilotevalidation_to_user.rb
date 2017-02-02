class AddPilotevalidationToUser < ActiveRecord::Migration
  def change
    add_column :users, :pilotevalidation, :boolean, default: false
  end
end
