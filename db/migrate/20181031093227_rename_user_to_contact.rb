class RenameUserToContact < ActiveRecord::Migration[5.2]
  def change
    rename_column :contacts, :user, :user_name
  end
end
