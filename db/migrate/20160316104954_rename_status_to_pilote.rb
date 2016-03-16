class RenameStatusToPilote < ActiveRecord::Migration
  def change
    rename_column :users, :status, :pilote
  end
end
