class RemoveUserBooleanToUser < ActiveRecord::Migration
  def change
    remove_column :users, :status, :string
    remove_column :users, :boolean, :string
  end
end
