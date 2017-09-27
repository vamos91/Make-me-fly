class ChangeColumnType < ActiveRecord::Migration
  def change
    change_column :aeronefs, :photos, :string
  end
end
