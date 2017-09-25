class RenameClasseToAeronefCategory < ActiveRecord::Migration
  def change
    rename_column :aeronefs, :classe, :aeronef_category
  end
end
