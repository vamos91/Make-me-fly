class AddUserToContact < ActiveRecord::Migration[5.2]
  def change
    add_column :contacts, :user, :string
    add_column :contacts, :email, :string
    add_column :contacts, :price, :string
    add_column :contacts, :location, :string
  end
end
