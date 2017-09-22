class AddPhotosToAeronef < ActiveRecord::Migration
  def change
    add_column :aeronefs, :photos, :string, array:true, default: []
  end
end
