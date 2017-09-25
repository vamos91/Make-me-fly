class AddMarqueToAeronefs < ActiveRecord::Migration
  def change
    add_column :aeronefs, :marque, :string
    add_column :aeronefs, :modele, :string
  end
end
