class RenameTypeToCategory < ActiveRecord::Migration
  def change
    rename_column :aeronefs, :type, :category
  end
end
