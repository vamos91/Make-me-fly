class AddImageToAeronef < ActiveRecord::Migration[5.2]
  def change
    add_column :aeronefs, :image_1, :string
    add_column :aeronefs, :image_2, :string
    add_column :aeronefs, :image_3, :string
    add_column :aeronefs, :image_4, :string
  end
end
